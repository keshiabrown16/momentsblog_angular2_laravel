<?php 
$I = new ApiTester($scenario);
$I->wantTo('Create a blog post via API');
$I->haveHttpHeader('Authorization', 'Bearer {eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwLCJpc3MiOiJodHRwOlwvXC9taS1saW51eC53bHYuYWMudWtcL34wNzE0MDg5XC9tb21lbnRzXC9hcGlcL2xvZ2luXC9hdXRoIiwiaWF0IjoxNDkyMzA0MjEyLCJleHAiOjE0OTIzMDc4MTIsIm5iZiI6MTQ5MjMwNDIxMiwianRpIjoiNTY3YWQ2ZGFkNDA1ZGNhYjU0OTI5NmE2MjUwZDQ5ODIifQ.228XqXCe7ShqkvJBBWkpjPC8L7bUA59013lOcRZOB9U}');
$I->sendPOST('/post', [
	  'user_id' => '9',
      'post_title' => 'Sample post title',
      'post_excerpt' => 'Sample post excerpt',
	  'post_content' => 'Sample post content', 
	  'img_path' => 'https://www.google.co.uk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
	]);
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseIsJson();
$I->seeResponseContains('{"result":"Post Created"}');
$I->seeResponseContainsJson([
  'post' => [
  	  'user_id' => '9',
      'post_title' => 'Sample post title',
      'post_excerpt' => 'Sample post excerpt',
	    'post_content' => 'Sample post content', 
	    'img_path' => 'https://www.google.co.uk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
  ]
]);