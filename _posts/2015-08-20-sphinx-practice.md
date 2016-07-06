---
layout: post
title:  "[Sphinx] Sphinx+Scws搜索服务实践"
categories: [other]
---

#### Sphinx配置

```
### 以$前缀的变量为内置变量可以查看手册
### 以@前缀的可能是自定义变量
### source、index、indexer、searchd


### [主体] 游戏源
source games {
	### 数据库配置
	type			= mysql
	sql_host		= xxx
	sql_user		= xxx
	sql_pass		= xxx
	sql_db			= xxx
	sql_port		= 3306
	sql_sock		= /tmp/mysql.sock


	### 获取待索引数据前置SQL（编码以及增量索引）
	sql_query_pre 	= SET NAMES utf8
	sql_query_pre 	= REPLACE INTO sph_counter SELECT 1, MAX(id) FROM games


	### 为了避免待索引数据量过大，导致索引过程拖死Mysql，引入区间读取
	sql_range_step 		= 1000
	sql_ranged_throttle = 1000
	sql_query_range 	= SELECT MIN(id), MAX(id) FROM games \
			WHERE id<=(SELECT max_doc_id FROM sph_counter WHERE counter_id=1)


	### 获取待索引数据SQL
	sql_query 	= SELECT `game_id`, `title`, `summary`, `desc` FROM `games` \
			WHERE id<=(SELECT max_doc_id FROM sph_counter WHERE counter_id=1) \
			AND id >= $start AND id <= $end
}


### [增量] 游戏源
### 这里的“:”表示继承，配置项重新填写表示有进行覆盖
source games_delta : games {
	###
	sql_query_pre 	= SET NAMES utf8

	###
	sql_query_range = SELECT MIN(id), MAX(id) FROM games \
			WHERE id>(SELECT max_doc_id FROM sph_counter WHERE counter_id=1)

	###
	sql_query 		= SELECT `game_id`, `title`, `summary`, `desc` FROM `games` \
			WHERE id>( SELECT max_doc_id FROM sph_counter WHERE counter_id=1 ) \
			AND id >= $start AND id <= $end

	### 数据索引后执行的SQL
	sql_query_post_index = set @max_doc_id :=(SELECT max_doc_id FROM sph_counter WHERE counter_id=1)
	sql_query_post_index = REPLACE INTO sph_counter SELECT 2, IF($maxid, $maxid, @max_doc_id)
}


### 主索引
index games {
	source = games
	path = /usr/local/sphinx/var/data/games
	# docinfo = extern
	docinfo = none
	morphology = none
	min_word_len = 1
	min_prefix_len = 0
	html_strip = 1
	html_remove_elements = style, script
	# charset_type= utf-8 
	charset_table = U+FF10..U+FF19->0..9, 0..9, U+FF41..U+FF5A->a..z, U+FF21..U+FF3A->a..z,A..Z->a..z, a..z, U+0149, U+017F, U+0138, U+00DF, U+00FF, U+00C0..U+00D6->U+00E0..U+00F6,U+00E0..U+00F6, U+00D8..U+00DE->U+00F8..U+00FE, U+00F8..U+00FE, U+0100->U+0101, U+0101,U+0102->U+0103, U+0103, U+0104->U+0105, U+0105, U+0106->U+0107, U+0107, U+0108->U+0109,U+0109, U+010A->U+010B, U+010B, U+010C->U+010D, U+010D, U+010E->U+010F, U+010F,U+0110->U+0111, U+0111, U+0112->U+0113, U+0113, U+0114->U+0115, U+0115, U+0116->U+0117,U+0117, U+0118->U+0119, U+0119, U+011A->U+011B, U+011B, U+011C->U+011D, U+011D,U+011E->U+011F, U+011F, U+0130->U+0131, U+0131, U+0132->U+0133, U+0133, U+0134->U+0135,U+0135, U+0136->U+0137, U+0137, U+0139->U+013A, U+013A, U+013B->U+013C, U+013C,U+013D->U+013E, U+013E, U+013F->U+0140, U+0140, U+0141->U+0142, U+0142, U+0143->U+0144,U+0144, U+0145->U+0146, U+0146, U+0147->U+0148, U+0148, U+014A->U+014B, U+014B,U+014C->U+014D, U+014D, U+014E->U+014F, U+014F, U+0150->U+0151, U+0151, U+0152->U+0153,U+0153, U+0154->U+0155, U+0155, U+0156->U+0157, U+0157, U+0158->U+0159, U+0159,U+015A->U+015B, U+015B, U+015C->U+015D, U+015D, U+015E->U+015F, U+015F, U+0160->U+0161,U+0161, U+0162->U+0163, U+0163, U+0164->U+0165, U+0165, U+0166->U+0167, U+0167,U+0168->U+0169, U+0169, U+016A->U+016B, U+016B, U+016C->U+016D, U+016D, U+016E->U+016F,U+016F, U+0170->U+0171, U+0171, U+0172->U+0173, U+0173, U+0174->U+0175, U+0175,U+0176->U+0177, U+0177, U+0178->U+00FF, U+00FF, U+0179->U+017A, U+017A, U+017B->U+017C,U+017C, U+017D->U+017E, U+017E, U+0410..U+042F->U+0430..U+044F, U+0430..U+044F,U+05D0..U+05EA, U+0531..U+0556->U+0561..U+0586, U+0561..U+0587, U+0621..U+063A, U+01B9,U+01BF, U+0640..U+064A, U+0660..U+0669, U+066E, U+066F, U+0671..U+06D3, U+06F0..U+06FF,U+0904..U+0939, U+0958..U+095F, U+0960..U+0963, U+0966..U+096F, U+097B..U+097F,U+0985..U+09B9, U+09CE, U+09DC..U+09E3, U+09E6..U+09EF, U+0A05..U+0A39, U+0A59..U+0A5E,U+0A66..U+0A6F, U+0A85..U+0AB9, U+0AE0..U+0AE3, U+0AE6..U+0AEF, U+0B05..U+0B39,U+0B5C..U+0B61, U+0B66..U+0B6F, U+0B71, U+0B85..U+0BB9, U+0BE6..U+0BF2, U+0C05..U+0C39,U+0C66..U+0C6F, U+0C85..U+0CB9, U+0CDE..U+0CE3, U+0CE6..U+0CEF, U+0D05..U+0D39, U+0D60,U+0D61, U+0D66..U+0D6F, U+0D85..U+0DC6, U+1900..U+1938, U+1946..U+194F, U+A800..U+A805,U+A807..U+A822, U+0386->U+03B1, U+03AC->U+03B1, U+0388->U+03B5, U+03AD->U+03B5,U+0389->U+03B7, U+03AE->U+03B7, U+038A->U+03B9, U+0390->U+03B9, U+03AA->U+03B9,U+03AF->U+03B9, U+03CA->U+03B9, U+038C->U+03BF, U+03CC->U+03BF, U+038E->U+03C5,U+03AB->U+03C5, U+03B0->U+03C5, U+03CB->U+03C5, U+03CD->U+03C5, U+038F->U+03C9,U+03CE->U+03C9, U+03C2->U+03C3, U+0391..U+03A1->U+03B1..U+03C1,U+03A3..U+03A9->U+03C3..U+03C9, U+03B1..U+03C1, U+03C3..U+03C9, U+0E01..U+0E2E,U+0E30..U+0E3A, U+0E40..U+0E45, U+0E47, U+0E50..U+0E59, U+A000..U+A48F, U+4E00..U+9FBF,U+3400..U+4DBF, U+20000..U+2A6DF, U+F900..U+FAFF, U+2F800..U+2FA1F, U+2E80..U+2EFF,U+2F00..U+2FDF, U+3100..U+312F, U+31A0..U+31BF, U+3040..U+309F, U+30A0..U+30FF,U+31F0..U+31FF, U+AC00..U+D7AF, U+1100..U+11FF, U+3130..U+318F, U+A000..U+A48F,U+A490..U+A4CF 
	ngram_len = 1 
	ngram_chars = U+4E00..U+9FBF, U+3400..U+4DBF, U+20000..U+2A6DF, U+F900..U+FAFF,U+2F800..U+2FA1F, U+2E80..U+2EFF, U+2F00..U+2FDF, U+3100..U+312F, U+31A0..U+31BF,U+3040..U+309F, U+30A0..U+30FF, U+31F0..U+31FF, U+AC00..U+D7AF, U+1100..U+11FF,U+3130..U+318F, U+A000..U+A48F, U+A490..U+A4CF
}


### 增量索引
index games_delta : games {
	source = games_delta
	path = /usr/local/sphinx/var/data/games-delta
}


indexer {
	mem_limit = 256M
}


searchd {
	listen 					= 9312
	listen 					= 9306:mysql41 #Used for SphinxQL
	pid_file 				= /usr/local/sphinx/var/log/searchd.pid
	log 					= /usr/local/sphinx/var/log/searchd.log
	query_log 				= /usr/local/sphinx/var/log/query.log
	binlog_path 			= /usr/local/sphinx/var/data
	attr_flush_period 		= 600
	mva_updates_pool 		= 16M
	read_timeout 			= 5
	max_children 			= 0
	dist_threads 			= 2 
	seamless_rotate 		= 1
	preopen_indexes 		= 1
	unlink_old 				= 1
	workers 				= threads # for RT to work
}
```


--------------------------------------------------------


#### PHP测试Demo

```
<?php
/**
 *  SphinxTest
 *
 *  scws + sphinx构造的中文搜索服务
 *  scws提供中文分词服务
 *  sphinx提供索引和搜索服务
 *
 * 	关于搜索精度需要关注`搜索模式`的配置
 * 	如搜索“西游”，是要当做一个搜索词还是两个搜索词
 */
class SphinxTest
{
	/**
	 * @var SphinxClient
	 */
	public $client;

	/**
	 * @var string
	 */
	public $keywords;

	/**
	 * 构造函数
	 */
	public function __construct()
	{
		$s = new SphinxClient();
		$s->SetServer('localhost', 9312);
		$s->SetMatchMode(SPH_MATCH_EXTENDED2);
		$s->SetLimits(0, 5, 5);

		$this->client = $s;
	}

	/**
	 * 测试入口
	 */
	public function run()
	{
		$keywords = "大话西游";
		$words = $this->wordSplit($keywords);
		$ids = $this->querySphinx($words);
		$data = $this->getData($ids);

		$this->buildExcerptRows($data);

		echo "<pre>";
		print_r("================> | 搜索词：<br />");
		print_r($keywords);
		echo "</pre>";

		echo "<pre>";
		print_r("================> | 搜索词拆分后：<br />");
		print_r($words);
		echo "</pre>";

		echo "<pre>";
		echo "================> | 从Sphinx中搜索到的文档ID<br />";
		print_r($ids);
		echo "</pre>";

		echo "<pre>";
		echo "================> | 从Mysql中搜索到的文档<br />";
		print_r($data);
		echo "</pre>";
	}

	/**
	 * @param $keywords
	 *
	 * @return string
	 */
	function wordSplit($keywords)
	{
		///
		$fpath = ini_get('scws.default.fpath');
		$so = scws_new();
		$so->set_charset('utf-8');
		//$so->add_dict($fpath .'/custom_dict.txt', SCWS_XDICT_TXT);
		$so->add_dict($fpath . '/dict.utf8.xdb');
		$so->set_rule($fpath . '/rules.utf8.ini');
		$so->set_ignore(true);
		$so->set_multi(false);
		$so->set_duality(false);
		$so->send_text($keywords);
		$words = array();
		$results = $so->get_result();
		foreach ($results as $res) {
			$words[] = '(' . $res['word'] . ')';
		}
		$words[] = '(' . $keywords . ')';
		// $words = array("西游");

		return join('|', $words);
	}

	/**
	 * @param $keywords
	 *
	 * @return array
	 */
	function querySphinx($keywords)
	{
		///
		$this->keywords = $keywords;
		$result = $this->client->Query($keywords);
		if (empty($result['matches'])) 
			return array();

		$res['total'] = $result['total'];
		$res['total_found'] = $result['total_found'];
		$res['time'] = $result['time'];
		$ids = array_keys($result['matches']);

		return $ids;
	}

	/**
	 * @param $ids
	 *
	 * @return array
	 */
	function getData($ids)
	{
		///
		$dsn = 'mysql:host=xxx;dbname=xxx';
		$user = 'xxx';
		$pass = 'xxx';
		$pdo = new PDO($dsn, $user, $pass);

		///
		$ids = implode(',', $ids);
		$queries = $pdo->query("SELECT * FROM games WHERE game_id in ($ids)", PDO::FETCH_ASSOC);
		if ($queries == false)
			return array();

		return iterator_to_array($queries);
	}

	/**
	 * @param $rows
	 *
	 * @return mixed
	 */
	function buildExcerptRows(&$rows)
	{
		///
		$options = array(
			'before_match' => '<b style="color:red">',
			'after_match' => '</b>',
			'chunk_separator' => '...',
			'limit' => 256,
			'around' => 3,
			'exact_phrase' => false,
			'single_passage' => true,
			'limit_words' => 5,
		);
		$fields = array('title', 'desc', 'summary');
		$scount = count($fields);
		foreach ($rows as &$row) {
			foreach ($row as $fk => $item) {
				if (! is_string($item) || ($scount && ! in_array($fk, $fields)))
					continue;

				$item = preg_replace('/[\r\t\n]+/', '', strip_tags($item));
				$res = $this->client->buildExcerpts(array($item), 'games', $this->keywords, $options);
				$row[$fk] = $res === false ? $item : $res[0];
			}
		}

		return $rows;
	}
}

///
header("content-type:text/html;charset=utf-8");
$o = new SphinxTest();
$o->run();
?>
```


--------------------------------------------------------


#### P's

* 关于一元分词

![cdn-source](/public/images/sphinx-words.png)

* 其它方案`elasticsearch`


--------------------------------------------------------


#### 参考

* [Sphinx+Scws 搭建千万级准实时搜索&应用场景详解](http://www.ttlsa.com/sphinx/sphinx_scws-to-build-tens-of-millions-of-quasi-real-time-search-_-application-scenarios/){:target="_blank"}
* [Sphinx + PHP + scws构建MySQL准实时分布式全文检索实战](http://www.qixing318.com/article/sphinx-php-scws-build-mysql-quasi-realtime-distributed-fulltext-retrieval-of-actual-combat.html){:target="_blank"}
* [Sphinx+Scws全文检索引擎方案安装部署](http://yanue.net/post-128.html){:target="_blank"}
* [Sphinx 配置文件全解析](http://www.cnblogs.com/yjf512/p/3598332.html){:target="_blank"}
