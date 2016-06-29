---
layout: post
title:  "[Golang] goroutine和channel实践"
categories: [golang]
---

场景：

将数据库中每个表中的game_id和user_id导出成日志文件，
由于共有1K+张表，顺序导出花费时间会很多，一次性并发导出又可能对mysql的io占用比较高进而影响线上业务。
所以暂定以5张表并发进行导出的方式。语言方面使用Golang实现，主要涉及要点：

* 如何导出数据（需要导出的数据都在索引上面，可以直接使用索引快速查询）？
* 如何有效控制并发量（使用channel，可以利用阻塞特性进行控制）？

```
/**
 * TODO
 *
 * [os/exec]
 * 	https://github.com/viney/command/blob/master/main.go
 *  http://www.widuu.com/archives/01/927.html
 */
package main

import (
	"bufio"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"os/exec"
	"strconv"
	"time"
)

var total int
var quit chan int
var chInt chan int

/**
 *
 */
func main() {
	list := []map[string]string{
		{
			"min":  "1",
			"max":  "80",
			"flag": "hot",

			"host":     "xxx",
			"database": "xxx",
			"user":     "xxx",
			"pwd":      "xxx",
		},
	}

	///
	total = 80
	quit = make(chan int)
	chInt = make(chan int, 5)
	fmt.Println("Len:", len(chInt))
	fmt.Println("Cap:", cap(chInt))
	for _, conf := range list {
		doDatabase(conf)
	}

	///
	for {
		select {
		case <-quit:
			return
		}
	}
}

/**
 *
 */
func doDatabase(conf map[string]string) {
	min, _ := strconv.Atoi(conf["min"])
	max, _ := strconv.Atoi(conf["max"])
	for i := min; i <= max; i++ {
		chInt <- 1
		table := fmt.Sprintf("user_%03d", i)
		argv := []string{
			fmt.Sprintf("-u%s", conf["user"]),
			fmt.Sprintf("-p%s", conf["pwd"]),
			fmt.Sprintf("-h%s", conf["host"]),
			fmt.Sprintf("-e SELECT DISTINCT game_id,user_id FROM %s.%s;", conf["database"], table),
		}
		cmd := exec.Command("mysql", argv...)
		go runCmd(cmd, table, conf["flag"])
	}
}

/**
 *
 */
func runCmd(cmd *exec.Cmd, table string, flag string) {
	///
	timeStart := now()

	/// 等待结束
	defer func() {
		timeEnd := now()
		fmt.Printf("[%s_%s] %s - %s\n", flag, table, timeStart, timeEnd)
		if err := cmd.Wait(); err != nil {
			fmt.Println("Wait: ", err.Error())
			return
		}

		<-chInt
		total--
		if total == 0 {
			quit <- 1
		}
	}()

	/// 监听管道
	stderr, err := cmd.StderrPipe()
	if err != nil {
		fmt.Println("StderrPipe: ", err.Error())
		return
	}
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		fmt.Println("StdoutPipe: " + err.Error())
		return
	}

	/// 启动并处理管道内容
	if err := cmd.Start(); err != nil {
		fmt.Println("Start: ", err.Error())
		return
	}
	if !handlerStderr(stderr) {
		return
	}
	handlerStdout(stdout, table, flag)
}

func handlerStderr(stderr io.ReadCloser) bool {
	///
	bytesErr, err := ioutil.ReadAll(stderr)
	if err != nil {
		fmt.Println("ReadAll stderr: ", err.Error())
		return false
	}
	if len(bytesErr) != 0 {
		fmt.Printf("stderr is not nil: %s", bytesErr)
		return false
	}

	return true
}

func handlerStdout(stdout io.ReadCloser, table string, flag string) {
	///
	file := fmt.Sprintf("./table/%s_%s.log", flag, table)
	fp, err := os.OpenFile(file, os.O_WRONLY|os.O_CREATE, 0666)
	defer fp.Close()
	if err != nil {
		fmt.Printf(err.Error())
		return
	}

	///
	i := 0
	rd := bufio.NewReader(stdout)
	for {
		i++
		line, ferr := rd.ReadString('\n')
		if ferr == io.EOF {
			return
		}
		if i == 1 {
			continue
		}
		fp.WriteString(line)
	}
}

func now() string {
	return time.Now().Format("2006/01/02 15:04:05")
}
```
