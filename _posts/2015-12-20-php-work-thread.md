---
layout: post
title:  "[PHP] 多进程多线程实现"
categories: [php]
---

### 背景
-----------------------------

在PHP中经常会涉及到批量处理大量数据（统计脚本）、多次远程API异步调用等等场景。
这些场景中如果可以使用多线程的方式，将需要大量时间运行的任务以线程的方式并行执行将从整体上提高效率。
这里帖3种常见的“多进程/多线程”的实现。

### 方案1
-----------------------------

利用curl或fsockopen在业务中发起多次的http请求（只发请求不等待响应，类似异步的感觉），从而达到伪多进程的效果。

```php
<?php
class HttpThreads
{
	/**
	 * 异步POST请求，不关心响应
	 *
	 * @param $url
	 * @param $data
	 */
	public function post($url, $data)
	{
		$query = http_build_query($data);

		$info = parse_url($url);
		$info['port'] = isset($info['port']) ? $info['port'] : 80;
		$fp = fsockopen($info['host'], $info['port'], $errno, $errstr, 3);
		$head = "POST " . $info['path'] . " HTTP/1.0\r\n";
		$head .= "Host: " . $info['host'] . "\r\n";
		$head .= "Referer: http://" . $info['host'] . $info['path'] . "\r\n";
		$head .= "Content-type: application/x-www-form-urlencoded\r\n";
		$head .= "Content-Length: " . strlen(trim($query)) . "\r\n";
		$head .= "\r\n";
		$head .= trim($query);
		fputs($fp, $head);
		fclose($fp);
	}

	/**
	 * 异步GET请求，不关心响应
	 *
	 * @param $url
	 * @param $data
	 */
	public function get($url)
	{
		$info = parse_url($url);
		$info['port'] = isset($info['port']) ? $info['port'] : 80;
		$fp = fsockopen($info['host'], $info['port'], $errno, $errstr, 3);
		$head = "GET " . $url . " HTTP/1.0\r\n";
		$head .= "Host: " . $info['host'] . "\r\n";
		$head .= "\r\n";
		fputs($fp, $head);
		fclose($fp);
	}

	/**
	 * 调用API
	 *
	 * @param $method
	 * @param $host
	 * @param int $port
	 * @param string $uri
	 * @param array $postData
	 * @param int $timeout
	 * @param bool $sync
	 *
	 * @return string
	 */
	public function callApi($method, $host, $port = 80, $uri = '/', $postData = array(), $timeout = 1000, $sync = false)
	{
		$result = '';
		$postStr = '';
		$method = strtoupper($method);
		foreach ($postData as $k => $v) {
			if (is_array($v)) {
				foreach ($v as $k2 => $v2)
					$postStr .= urlencode($k) .'['. urlencode($k2) .']='. urlencode($v2) .'&';
			} else
				$postStr .= urlencode($k) .'='. urlencode($v) .'&';
		}

		$crlf = "\r\n";
		$req = $method .' '. $uri . ' HTTP/1.1' . $crlf;
		$req .= 'Host: '. $host . $crlf;
		$req .= 'User-Agent: Mozilla/5.0 Firefox/3.6.12' . $crlf;
		$req .= 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' . $crlf;
		$req .= 'Accept-Language: en-us,en;q=0.5' . $crlf;
		$req .= 'Accept-Encoding: deflate' . $crlf;
		$req .= 'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7' . $crlf;

		if ($method == 'POST' && !empty($postStr)) {
			$postStr = substr($postStr, 0, -1);
			$req .= 'Content-Type: application/x-www-form-urlencoded' . $crlf;
			$req .= 'Content-Length: '. strlen($postStr) . $crlf . $crlf;
			$req .= $postStr;
		} else
			$req .= $crlf;

		if (($fp = @fsockopen($host, $port, $errno, $errstr)) == false)
			return "Error $errno: $errstr\n";

		stream_set_timeout($fp, 0, $timeout * 1000);

		fputs($fp, $req);
		if ($sync) { // $sync=false, 不取回结果，也就是类似异步操作
			while ($line = fgets($fp)) $result .= $line;
		}
		fclose($fp);

		if ($sync) {
			$result = substr($result, strpos($result, "\r\n\r\n") + 4);
			return $result;
		}
		return;
	}
}
?>
```


### 方案2
-----------------------------

利用pcntl提供的多进程扩展实现。

pcntl_fork — 在当前进程当前位置产生分支（子进程）。
译注：fork是创建了一个子进程，父进程和子进程 都从fork的位置开始向下继续执行，
不同的是父进程执行过程中，得到的fork返回值为子进程 号，而子进程得到的是0。

```php
<?php
class PcntlCtrl
{
	/**
	 * [handle description]
	 * @return [type] [description]
	 */
	public function handle()
	{
		$works = 20;
		for ($i=0; $i < $works; $i++) { 
			$pid = pcntl_fork();
			// 父进程和子进程都会执行下面代码
			if ($pid == -1) {
				// 错误处理：创建子进程失败时返回-1.
				die('could not fork');
			} else if ($pid) {
				// 父进程会得到子进程号，所以这里是父进程执行的逻辑
				pcntl_waitpid($pid, $status); //等待子进程中断，防止子进程成为僵尸进程。
			} else {
				// 子进程得到的$pid为0, 所以这里是子进程执行的逻辑。
				$this->work($i, $pid);
			}
		}
	}

	/**
	 * [work description]
	 * @param  [type] $index [description]
	 * @param  [type] $pid   [description]
	 * @return [type]        [description]
	 */
	protected function work($index, $pid)
	{
		$s = mt_rand(1, 5);
		sleep($s);

		printf("%s | %s | %s \r\n", $index, $pid, date('Y-m-d H:i:s'));
	}
}

$o = new PcntlCtrl();
$o->handle();
?>
```


### 方案3
-----------------------------
利用pthreads PHP扩展，使PHP真正地支持多线程。

当调用 Thread 对象的 start 方法时，该对象的 run 方法中的代码将在独立线程中异步执行。

run 方法中的代码执行完毕之后，独立线程立即退出，并且等待合适的时机由创建者线程加入（join）。

```php
<?php
class MyThread extends Thread
{
	/**
	* [$index description]
	* @var [type]
	*/
	public $index;

	/**
	* [__construct description]
	* @param [type] $index [description]
	*/
	public function __construct($index)
	{
		$this->index = $index;
	}

	/**
	* [run description]
	* @return [type] [description]
	*/
	public function run()
	{
		$s = mt_rand(1, 5);
		sleep($s);

		printf("%s | %s \r\n", $index, date('Y-m-d H:i:s'));
	}
}

for ($i = 0; $i < 10; $i++) {
    $thread = new MyThread($i);

    // 在独立线程中执行 run 方法
    $thread->start();
    while ($thread->isRunning()) {
        usleep(10);
    }
    
    //让当前执行上下文等待被引用线程执行完毕
    $thread->join();
}
?>
```


### 参考
-----------------------------

* [PHP的pcntl多进程](http://www.cnblogs.com/yjf512/p/3217615.html){:target="_blank"}
* [PHP 真正多线程的使用](http://zyan.cc/pthreads/){:target="_blank"}
