#!/usr/bin/python
# -*- coding: utf-8 -*-

'''本脚本修改自scribe_cat的脚本，用于提供一个循环标准输入记录到scribe,主要用nginx采集日志等'''

import sys
import time
from scribe import scribe
from thrift.transport import TTransport, TSocket
from thrift.protocol import TBinaryProtocol
import re

reload(sys)
sys.setdefaultencoding('utf-8')


def longtoip(iplong):
  i_4 = iplong % 256
  i_3 = (iplong - i_4)/256 % 256
  i_2 = (iplong - i_3*256 - i_4)/256**2 % 256
  i_1 = (iplong - i_2*256*256 - i_3*256 - i_4)/256**3 % 256
  ip = str(i_1)+'.'+str(i_2)+'.'+str(i_3)+'.'+str(i_4)
  return ip


if len(sys.argv) == 2:
  category = sys.argv[1]
  host = '127.0.0.1'
  port = 1463
elif len(sys.argv) == 4 and sys.argv[1] == '-h':
  category = sys.argv[3]
  host_port = sys.argv[2].split(':')
  host = host_port[0]
  if len(host_port) > 1:
    port = int(host_port[1])
  else:
    port = 1463
else:
  sys.exit('usage (message is stdin): scribe_ngx [-h host[:port]] category')


socket = TSocket.TSocket(host=host, port=port)
transport = TTransport.TFramedTransport(socket)
protocol = TBinaryProtocol.TBinaryProtocol(trans=transport, strictRead=False, strictWrite=False)
client = scribe.Client(iprot=protocol, oprot=protocol)

'''
判断是否能连接scribe，设置标志位isCon ，如果isCon为0将日志写的本地临时文件。
防止scribe出错，导致程序异常并不记录日志文件
'''
errorFile="/tmp/scribe_ngx_error.log"
tmpFile="/tmp/scribe_ngx_temp.log"

'''
当连接scribe失败将重新连接scribe,retryTime设置重新连接的秒数
'''
retryTime = 3

eF = open(errorFile,'a')
tF = open(tmpFile,'a')

try:
  transport.open()
  isCon = 1
except Exception,e:
  bStart = int(time.time())
  eF.write(time.ctime()+' Can not Connect to Scribe\n')
  isCon = 0


#reobj=re.compile(r'.*clientip=([0-9\.]+),.*method=([^,]+),.*"uid":([0-9]+).*')  
#reobj=re.compile(r'.*clientip=([0-9\.]+),.*method=([^,]+),.*"(uid|result)":([0-9]+).*')  

while True:
  message = "%s" % raw_input()
#  m = reobj.match(message)
#  if m is not None:
#    mg =  m.groups()
#    if '.' not in mg[0]:
#      try:
#        ip = longtoip(long(mg[0]))
#      except Exception,e:
#        eF.write(mg[0]+' '+str(e)+'\n')
#        ip = mg[0]
#    else:
#      ip = mg[0]
#    message = ip + "\t" + mg[3] + "\t"+ mg[1]
#  else:
#    tF.write(message+'\n')
#    continue    
  log_entry = scribe.LogEntry(category=category, message=message)
  if isCon == 1:
    try:
      result = client.Log(messages=[log_entry])
      if result != scribe.ResultCode.OK:
        eF.write(time.ctime()+' scribe.ResultCode_ERROR: '+str(result)+'\n')
        tF.write(message+'\n')
    except Exception,e:
      bStart = int(time.time())
      isCon = 0
      tF.write(message+'\n')
  else:
    tF.write(message+'\n')
    step = int(time.time()) - bStart
    if step >= retryTime:
      try:
        transport.open()
        isCon = 1
      except Exception,e:
        bStart = int(time.time())
        isCon = 0

transport.close()
eF.close()
tf.close()
