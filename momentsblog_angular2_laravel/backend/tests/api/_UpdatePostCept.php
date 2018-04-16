<?php 
$I = new ApiTester($scenario);
$I->wantTo('Update a blog post via API');
$I->haveHttpHeader('Authorization', 'Bearer {eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwLCJpc3MiOiJodHRwOlwvXC9taS1saW51eC53bHYuYWMudWtcL34wNzE0MDg5XC9tb21lbnRzXC9hcGlcL2xvZ2luXC9hdXRoIiwiaWF0IjoxNDkyMzA0MjEyLCJleHAiOjE0OTIzMDc4MTIsIm5iZiI6MTQ5MjMwNDIxMiwianRpIjoiNTY3YWQ2ZGFkNDA1ZGNhYjU0OTI5NmE2MjUwZDQ5ODIifQ.228XqXCe7ShqkvJBBWkpjPC8L7bUA59013lOcRZOB9U}');
$I->sendPOST('/post/64', [	'post_title' => 'The updated post title',
							'post_excerpt' => 'The updated post excerpt',
							'post_content' => 'The updated post content',
	  						'img_path' => 'https://heavyeditorial.files.wordpress.com/2015/01/1999-copy.jpg?quality=65&strip=all&strip=all'
						   ]);
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseIsJson();
$I->seeResponseContains('{"result":"Post Updated"}');
$I->seeResponseContainsJson([
  'message' => 'Post updated'
]);
$I->seeResponseContainsJson([
  'post' => [
				'post_title' => 'The updated post title',
							'post_excerpt' => 'The updated post excerpt',
							'post_content' => 'The updated post content',
	  						'img_path' => 'https://heavyeditorial.files.wordpress.com/2015/01/1999-copy.jpg?quality=65&strip=all&strip=all'
  ]
]);
