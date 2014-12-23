DROP TABLE IF EXISTS `blog`.`articles`;
CREATE TABLE  `blog`.`articles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `date_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `date_modify` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `title` text NOT NULL COMMENT '标题',
  `content` longtext NOT NULL COMMENT '内容',
  `tags` text,
  `seo_path` varchar(100) NOT NULL COMMENT '文章的url名字',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `blog`.`tag_article`;
CREATE TABLE  `blog`.`tag_article` (
  `aid` int(10) unsigned NOT NULL,
  `tag` text NOT NULL,
  KEY `aid` (`aid`),
  CONSTRAINT `aid` FOREIGN KEY (`aid`) REFERENCES `articles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `blog`.`tags`;
CREATE TABLE  `blog`.`tags` (
  `tag` text NOT NULL,
  `count` int(10) unsigned NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;