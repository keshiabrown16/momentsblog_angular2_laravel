<?php 
$I = new ApiTester($scenario);
$I->wantTo('Get all blog posts via API');
$I->haveHttpHeader('Authorization', 'Bearer {eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwLCJpc3MiOiJodHRwOlwvXC9taS1saW51eC53bHYuYWMudWtcL34wNzE0MDg5XC9tb21lbnRzXC9hcGlcL2xvZ2luXC9hdXRoIiwiaWF0IjoxNDkyMzA3OTQzLCJleHAiOjE0OTIzMTE1NDMsIm5iZiI6MTQ5MjMwNzk0MywianRpIjoiZjM3ZmQ1YmUwNjkzMmE2MDIzYzZiMjlmNjk2NWQ5NGQifQ.Vx5d4mqJbQTt6UThNA5kLofdIv_VUOkWfgXNZ2X-Whk}');
$I->sendGET('/9/posts');
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseIsJson();
$I->seeResponseContains('{"result":"Successfully fetched user posts"}');
$I->seeResponseContainsJson([
  'post' => []
]);