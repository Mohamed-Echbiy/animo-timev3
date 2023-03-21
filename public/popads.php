<!--<?php

/* PopAds simple adcode fetching library, second revision + 2017-03 patch
 * Compatible with PHP4-7
 *
 * Usage:
 * in your template, between <head> and </head>, insert:
 * <?php include('<path-to-this-file>/popads.php'); ?>
 *
 * Warning: it won't work with template systems like Smarty as-is! To make it working:
 * - remove <!-- from the beginning and $pa_orep = error_reporting(0); phrase
 * - remove everything from the /* 8<---- comment at the end onwards
 * - change var $verbose = true; to var $verbose = false;
 * - include this file, create new PopAdsAdcode() object and get the adcode via read() method, then bind it to template
 * Don't use get_* methods directly without caching on your side.
 *
 */

$pa_orep = error_reporting(0);

class PopAdsAdcode {

	/* Same as in Code Generator */
	var $minBid = 0;
	var $popundersPerIP = '0';
	var $delayBetween = 0;
	var $defaultPerDay = 0;
	var $topmostLayer = 0;
	/* URL or Base64-encoded Javascript */
	var $default = false;
	/* Your individually-assigned settings */
	var $key = '77ebe35d061dce0a491cd6cd34f67a5e7c047487';
	var $siteId = 4956660;
	/* It's better to leave below as-is, really */
	var $antiAdblock = 1;
	var $obfuscate = 1;

	/* Set to true, if your server properly supports SSL (OpenSSL or equiv. installed, and IPv6 resolving disabled -
	   it is known to cause problems while trying to resolve our domain on certain configurations) */
	var $ssl = false;
	/* Set to false to suppress outputting debug information */
	var $verbose = true;
	/* Set to override adcode cache directory */
	var $adcodeDir = false;
	
	/* Advanced settings */
	
	/* cURL connection timeout (seconds) */
	var $curlTimeout = 5;
	var $curlConnectTimeout = 2;
	/* TRUE to autodetect cURL, set to FALSE to enable fallback methods and skip cURL check (better leave as-is) */
	var $curlInstalled = true;
	
	/* FGC timeout (seconds) */
	var $fgcTimeout = 5;
	/* TRUE to autodetect FGC, set to FALSE to enable fallback methods and skip FGC check (better leave as-is) */
	var $fgcInstalled = true;
	
	/* fsockopen/stream_* timeouts (seconds) */
	var $fsockTimeout = 5;
	var $fsockConnectTimeout = 2;
	/* TRUE to autodetect fsockopen/stream_*, set to FALSE to enable fallback methods and skip check (better leave as-is) */
	var $fsockInstalled = true;
	
	/* socket_* timeout (seconds) */
	var $sockTimeout = 5;
	/* TRUE to autodetect socket_*, set to FALSE to enable fallback methods and skip socket_* check (better leave as-is) */
	var $sockInstalled = true;

	function getCurl($url) {
		/* Test capabilities */
		if ((!extension_loaded('curl')) || (!function_exists('curl_version'))) {
			$this->curlInstalled = false; /* set to FALSE to enable fallback methods */
			return false; /* cURL does not exist */
		}
		/* Initialize object */
		curl_setopt_array($curl = curl_init(), array(
			CURLOPT_RETURNTRANSFER => 1,			
			CURLOPT_USERAGENT => 'PopAds CGAPIL2 A',
			CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4,	
			CURLOPT_FOLLOWLOCATION => false,
			CURLOPT_FAILONERROR => true,
			CURLOPT_SSL_VERIFYPEER => true,			
			CURLOPT_HEADER => false,
			CURLOPT_HTTPHEADER => array('Accept: text/plain,application/json;q=0.9'),
			CURLOPT_TIMEOUT => $this->curlTimeout,	
			CURLOPT_CONNECTTIMEOUT => $this->curlConnectTimeout
		));
		/* Test capabilities for HTTPS */
		if ($this->ssl && (($version = curl_version()) && ($version['features'] & CURL_VERSION_SSL))) {
			curl_setopt($curl, CURLOPT_URL, 'https://www.popads.net' . $url);
			if (($code = curl_exec($curl)) && (curl_getinfo($curl, CURLINFO_HTTP_CODE) == 200)) {
				curl_close($curl);
				return $code;
			}
		}
		/* Proceed via HTTP */
		curl_setopt($curl, CURLOPT_URL, 'http://www.popads.net' . $url);
		$code = curl_exec($curl);
		if (curl_getinfo($curl, CURLINFO_HTTP_CODE) != 200)
			$code = false;
		curl_close($curl);
		return $code; /* False on failure */
	}

	/* Not recommended; does not send Accept header, no control over SSL peer verification, might try to resolve IPV6 */
	function getFgc($url) {
		/* Test capabilities */
		if ( (!function_exists('file_get_contents')) || (!ini_get('allow_url_fopen')) || ((function_exists('stream_get_wrappers')) && (!in_array('http', stream_get_wrappers()))) ) {
			$this->fgcInstalled = false;
			return false; /* file_get_contents does not exist or does not support URL retrieval at all */
		}
		$headers = array(
			"Accept: text/plain,application/json;q=0.9",
			"User-Agent: PopAds CGAPIL2 B"
		);
		$options = array(
			'http' => array(
				'timeout' => $this->fgcTimeout,
				'header' => (!defined('PHP_VERSION_ID') || (constant('PHP_VERSION_ID') < 50210)) ? join("\r\n", $headers) : $headers,
			)
		);
		if (constant('PHP_VERSION_ID') > 50304)
			$options['http']['follow_location'] = 0;
		elseif (constant('PHP_VERSION_ID') > 50100) 
			$options['http']['max_redirects'] = 1;
		$context = stream_context_create($options);
		/* Test capabilities for HTTPS (PHP5+) */
		if ($this->ssl && ((!function_exists('stream_get_wrappers')) || (in_array('https', stream_get_wrappers())))) {
			$code = file_get_contents('https://www.popads.net' . $url, false, $context);
			if ($code)
				return $code;
		}
		/* Proceed via HTTP */
		return file_get_contents('http://www.popads.net' . $url, false, $context); /* False on failure */
	}

	/* Not recommended; no control over SSL peer verification, might try to resolve IPV6 if using HTTPS */
	function getFsock($url) {
		if ((function_exists('stream_get_wrappers')) && (!in_array('http', stream_get_wrappers()))) { /* Unlikely */
			$this->fsockInstalled = false;
			return false;
		}
		$enum = $estr = $in = $out = '';
		/* Test capabilities */
		if ($this->ssl && ((!function_exists('stream_get_wrappers')) || (in_array('https', stream_get_wrappers())))) {
			$fp = fsockopen('ssl://' . 'www.popads.net', 443, $enum, $estr, $this->fsockConnectTimeout);
		}
		/* Initialize plain connection */
		if ((!$fp) && (!($fp = fsockopen('tcp://' . gethostbyname('www.popads.net'), 80, $enum, $estr, $this->fsockConnectTimeout))))
			return false;
		stream_set_timeout($fp, $this->fsockTimeout);
		$out .= "GET " . $url . " HTTP/1.1\r\n";
		$out .= "Host: www.popads.net\r\n";
		$out .= "User-Agent: PopAds CGAPIL2 C\r\n";
		$out .= "Accept: text/plain,application/json;q=0.9\r\n";
		$out .= "Connection: close\r\n\r\n";
		fwrite($fp, $out);
		while (!feof($fp)) {
			$in .= fgets($fp, 1024);
		}
		fclose($fp);
		return substr($in, strpos($in, "\r\n\r\n") + 4);
	}

	/* Not recommended; no SSL support at all */
	function getSock($url) {
		if (!function_exists('socket_create')) {
			$this->sockInstalled = false;
			return false;
		}
		$in = $out = '';
		/* Only HTTP, last resort */
		if (!($sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)))
			return false;
		socket_set_block($sock);
		socket_set_option($sock, SOL_SOCKET, SO_RCVTIMEO, array('sec' => $this->sockTimeout, 'usec' => 0));
		if (!socket_connect($sock, gethostbyname('www.popads.net'), 80))
			return false;
		$out .= "GET " . $url . " HTTP/1.1\r\n";
		$out .= "Host: www.popads.net\r\n";
		$out .= "User-Agent: PopAds CGAPIL2 D\r\n";
		$out .= "Accept: text/plain,application/json;q=0.9\r\n";
		$out .= "Connection: close\r\n\r\n";
		socket_send($sock, $out, strlen($out), MSG_EOF);
		$in = socket_read($sock, 32768);
		socket_close($sock);
		return empty($in) ? false : substr($in, strpos($in, "\r\n\r\n") + 4);
	}

	function tmpDir() {
		$paths = array_unique(array_filter(array(
			'usr' => $this->adcodeDir,
			'ssp' => realpath(session_save_path()),
			'utd' => realpath(ini_get('upload_tmp_dir')),
			'env1' => (!empty($_ENV['TMP'])) ? realpath($_ENV['TMP']) : false,
			'env2' => (!empty($_ENV['TEMP'])) ? realpath($_ENV['TEMP']) : false,
			'env3' => (!empty($_ENV['TMPDIR'])) ? realpath($_ENV['TMPDIR']) : false,
			'sgtd' => (function_exists('sys_get_temp_dir')) ? realpath(sys_get_temp_dir()) : false,
			'cwd' => realpath(getcwd()),
			'cfd' => realpath(dirname(__FILE__))
		)));
		foreach ($paths as $key => $path) {
			if (($name = tempnam($path, 'popads-')) && (file_exists($name))) {
				unlink($name);
				if (strcasecmp(realpath(dirname($name)), $path) == 0) {
					if ($this->verbose) print 'T' . $key;
					return $path;
				}
			}
		}
		if ($this->verbose) print 'Terr';
		return false;
	}

	function buildQuery($query) {
		if ((function_exists('http_build_query')) && ($line = http_build_query($query, '', '&', PHP_QUERY_RFC3986))) {
			return $line;
		}
		/* Especially for PHP4 */
		$line = '';
		foreach ($query as $k => $v) {
			$line .= ((strlen($line) > 0) ? '&' : '') . rawurlencode($k) . '=' . rawurlencode($v);
		}
		return $line;
	}

	function formatUrl() {
		$uri = '/api/website_code?';
		$uric = array(
			'key' => $this->key,
			'website_id' => $this->siteId
		);
		if ($this->minBid > 0)
			$uric['mb'] = $this->minBid;
		if (!empty($this->popundersPerIP))
			$uric['ppip'] = $this->popundersPerIP;
		if ($this->delayBetween > 0)
			$uric['db'] = $this->delayBetween;
		if ($this->defaultPerDay > 0)
			$uric['dpd'] = $this->defaultPerDay;
		if ($this->topmostLayer > 0)
			$uric['tl'] = $this->topmostLayer;
		if ($this->antiAdblock) {
			$uric['aab'] = 1;
			$uric['of'] = 1;
		} else {
			if ($this->obfuscate)
				$uric['of'] = intval($this->obfuscate);
		}
		if (($this->default) && ($decoded_def = ($this->default)))
			$uric['def'] = $decoded_def;
		$uric['ver'] = $this->getEnvTargetVersion();
		return $uri . $this->buildQuery($uric);
	}

	/* Verbose version for debugging purposes */
	function read() {
		if ($this->verbose) print ' ';
		$url = $this->formatUrl();
		$tmp_dir = $this->tmpDir();
		if (!$tmp_dir)
			return '';
		$fn = $tmp_dir . '/popads-' . md5($url) . '.js';
		/* If exists and not older than a day, return */
		if (file_exists($fn) && (time() - filemtime($fn) < 3600))
			return file_get_contents($fn);
		if (file_exists($fn . '.lock') && (time() - filemtime($fn . '.lock') < 60))
			{ if ($this->verbose) print 'L'; return (file_exists($fn) ? file_get_contents($fn) : ''); }
		$code = false;
		if ($this->curlInstalled) {
			if ($this->verbose) print 'A'; $code = $this->getCurl($url);
		}
		if (!$this->curlInstalled) {
			if ($this->fgcInstalled) {
				if (!$code) { if ($this->verbose) print 'B'; $code = $this->getFgc($url); }
			}
			if (!$this->fgcInstalled) {
				if ($this->fsockInstalled) {
					if (!$code) { if ($this->verbose) print 'C'; $code = $this->getFsock($url); }
				}
				if (!$this->fsockInstalled) {
					if ($this->sockInstalled) {
						if (!$code) { if ($this->verbose) print 'D'; $code = $this->getSock($url); }
					}
					if (!$this->sockInstalled) {
						if (!$code) { if ($this->verbose) print 'E'; $code = ''; } /* Just indicate all transport failed (for debugging) */
					}
				}
			}
		}
		if ((!empty($code)) && (strpos($code, '<script type="text/javascript"') !== false)) {
			if (file_put_contents($fn . '.test', $code) > 0) {
				rename($fn . '.test', $fn);
				chmod($fn, 0755);
				clearstatcache(true, $fn);
			} else {
				if (touch($fn)) /* Disk probably full, preserve until resolved */
					chmod($fn, 0755);
			}
			return $code;
		} else {
			if (!($success = file_put_contents($fn . '.lock', $code))) {
				$success = touch($fn . '.lock'); 
			}
			if ($success)
				chmod($fn . '.lock', 0755);
			return (file_exists($fn) ? file_get_contents($fn) : '');
		}
	}
	
	/* We only collect this information for the purpose of targeting further development of this library, to serve proper adcode format and to notify you, if your action
	 * is required. No client data is being associated with these indicators. 
      * DO NOT modify this function, or the adcode returned might be incorrect for you without prior notice. */
	function getEnvTargetVersion() {
		$ver = phpversion();
		$ver .= ',aablib:20.11.2';
		/* If cURL installed */
		if (extension_loaded('curl') && function_exists('curl_version')) {
			$curlVerS = curl_version();
			$ver .= ',curl:' . $curlVerS['version'] . '/' . $curlVerS['ssl_version'];
			/* If all necessary functions present */
			$curlFunctions = 
				(function_exists('curl_version') ? 1 : 0) +
				(function_exists('curl_setopt') ? 2 : 0) +
				(function_exists('curl_setopt_array') ? 4 : 0) +
				(function_exists('curl_exec') ? 8 : 0) + 
				(function_exists('curl_close') ? 16 : 0) + 
				(function_exists('curl_getinfo') ? 32 : 0);
			$ver .= '/' . $curlFunctions;
		}
		if (function_exists('stream_get_wrappers')) {
			$wrapperList = stream_get_wrappers();
			$wrappers = 
				(in_array('http', $wrapperList) ? 1 : 0) + 
				(in_array('https', $wrapperList) ? 2 : 0);
			$ver .= ',sw:' . $wrappers;
		}
		if (function_exists('stream_get_transports')) {
			$transportList = stream_get_transports();
			$transports = 
				(in_array('tcp', $transportList) ? 1 : 0) + 
				(in_array('ssl', $transportList) ? 2 : 0) +
				(in_array('tls', $transportList) ? 4 : 0);
			$ver .= ',st:' . $transports;
		}
		$misc =
			(intval(ini_get('allow_url_fopen'))) ? 1 : 0;
		$ver .= ',m:' . $misc;
		return $ver;
	}

}


/* 8<---- */

$pad = new PopAdsAdcode();
$pad_code = $pad->read();

error_reporting($pa_orep);

?>-->
<?php print $pad_code; ?>
