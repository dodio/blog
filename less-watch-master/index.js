/**
 * less manager
 * 功能：
 *
 * 编译less生成css到public（可指定）目录，并生成一个最新编译文件与编译时间戳
 *
 * 通过调用 getCss方法可以获取一个前端的css地址，并在文件名后加上?编译时间戳去掉浏览器缓存
 *
 * 通过options 参数的配置
 *
 * lessDir less文件的目录（默认当前进程工作目录下的 less目录）
 * watch  可以配置实时监控less文件
 *
 * desc  public 文件夹地址
 *
 * cssRoot 前端的css外网路径前缀
 *
 * files: 输出文件信息(哪些文件需要编译,且所有编译出的文件，均能通过getCss方法获取)
 *   文件数组:手动指定要输出的文件列表
 *   过滤函数：提供一个过滤的函数，function(lessFilename){} true 编译该less 文件，false 不编译
 *   （私以为就不需要别的方式了，过滤函数可以很方便进行文件排除了）
 *
 *
 * lessOptions  less 编译参数
 * 
 *
 */

module.exports = require("./lib/master");