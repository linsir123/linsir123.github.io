---
layout: post
title:  "[CDN] 回源策略和更新机制"
categories: [default]
---

### CDN在项目中比较常见的两个应用场景
--------------------------------------

* 静态资源缓存，用于让访客可以通过就近的网络节点访问到资源，减少网络的等待时间；
* 网络攻防，用于在站点被流量攻击（DDOS）时，通过CDN的分布式网络节点，将攻击的流量进行稀释，并将源站点保护不暴露在公网环境中；



### 如何保持CDN和源站的版本一至性？
--------------------------------------

一个CDN请求的过程大致可以这样描述：

![cdn-source](/public/images/cdn-source.png)

我们可以通过两种常见的方式保持CDN和源站的数据一至性

+ *版本号*

	CDN根据url访问热度生成缓存，可以指定配置是否忽略query。若是不忽略则同一个url带上不同的query，则在CDN则会分别生成缓存。
	这样我们就可以通过这一特性，在url后带上不同的query，进行版本控制（如：http://cdn.domain.com/my.js?v=20160627）。

	另外还有一个比较粗暴的方法就是直接改文件名（如：http://cdn.domain.com/my20160627.js）。

	`这个方案有个弊端就是url在版本更新时会变更，也就是所有的引用处都要同步更新`

+ *缓存策略*

	由源端通过过期header直接管理缓存的过期策略。这点需要跟CDN服务商确认，默认他们的处理机制是由CDN统一控制资源的过期策略（如：js,css一周过期）
	在跟CDN服务商确认好由源端控制过期策略，就可以在apache/nginx或代码里输出过期头。

```
/**
 * @param $data
 * @param int $cacheExpire
 */
protected function _formatData($data, $cacheExpire = 600)
{
	///
	if (!is_array($data)) {
		echo json_encode(array());
		exit;
	}

	///
	if ($cacheExpire > 0) {
		header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
		header('Cache-Control: max-age=' . $cacheExpire);
		header('Expires: ' . gmdate('D, d M Y H:i:s', time() + $cacheExpire) . ' GMT');
	}

	///
	header('Content-type: application/json');
	echo json_encode($data);
	exit;
}
```


### 如何将源站的更新数据实时同步至CDN？
--------------------------------------

刚上述说到的两个方案，虽然可以保持CDN和源站的数据一至性。
不过在数据实时推送上还存在一定的延迟问题，所以我们在选择使用CDN服务时还是要结合场景来选择，并不是所有的场景都适用。

不过CDN有提供两种url刷新的机制（相当于强制指定url回源）

* 通过CDN提供的API，集成到源站的管理后台；
* 通过CDN提供的管理后台；
