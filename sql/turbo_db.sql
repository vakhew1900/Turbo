create database turbo;
use turbo;
-- drop database turbo;

create table `types`(
type_id int not null primary key auto_increment,
`name` varchar(255) not null
);

rename table multi_content to multi_contents;
create table multi_content(
multi_content_id int not null primary key auto_increment,
`path` varchar(300) not null,
`name` varchar(255) not null,
type_id int not null,
foreign key(type_id) references `types`(type_id) 
on delete cascade
on update cascade
);

rename table `status` to statuses;
create table `status`(
status_id int not null primary key auto_increment,
`name` varchar(300) not null
);

create table users(
user_id int not null primary key auto_increment,
nickname varchar(25) not null unique,
`password` varchar(25) not null,
`email` varchar(255) not null, 
rating int not null default 0,
avatar_id int not null,
status_id int not null,
foreign key(status_id) references `status`(status_id)
 on delete cascade
 on update cascade,
 
 foreign key(avatar_id) references multi_content(multi_content_id) 
 on delete cascade 
 on update cascade
);

create table `pages`(
page_id int not null primary key auto_increment,
html_content text not null,
author_id int not null,
foreign key(author_id) references users(user_id)
 on delete cascade
 on update cascade
);

create table drafts(
draft_id int not null primary key auto_increment,
foreign key(draft_id) references pages(page_id)
 on delete cascade
 on update cascade
);

create table news(
  news_id int not null primary key auto_increment,
  title varchar(200) not null,
 --  main_image_url varchar(300),
  subtitle varchar(300),
  foreign key(news_id) references pages(page_id)
  on delete cascade
  on update cascade
);

alter table news drop column main_image_url;

alter table news add column main_image_id int not null,
				add foreign key(main_image_id) references multi_contents(multi_content_id)
                on delete cascade
                on update cascade;

create table comments(
comment_id int not null primary key auto_increment,
text_content varchar(600) not null,
multi_content_id int not null,
foreign key(multi_content_id) references multi_content(multi_content_id) 
 on delete cascade 
 on update cascade
);

alter table comments 
	drop foreign key comments_ibfk_1,
    drop column multi_content_id,
	add multi_content_id int,
	add foreign key(multi_content_id) references multi_contents(multi_content_id) 
	on delete cascade 
	on update cascade;

drop table comments_news;
create table comments_news(
comment_id int not null,
news_id int not null,
primary key(comment_id, news_id),

foreign key(comment_id) references comments(comment_id) 
on delete cascade 
on update cascade,

foreign key(news_id) references news(news_id) 
on delete cascade 
on update cascade
);

rename table multi_content_page to multi_content_pages;
create table multi_content_page(
`number` int not null,
multi_content_id int not null,
page_id int not null,
primary key(page_id, multi_content_id, `number`),
foreign key(page_id) references pages(page_id) 
on delete cascade 
on update cascade,

foreign key(multi_content_id) references multi_content(multi_content_id) 
 on delete cascade 
 on update cascade
);