<?php 
$I = new ApiTester($scenario);
$I->wantTo('Delete a blog post via API');
$I->haveHttpHeader('Authorization', 'Bearer {eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwLCJpc3MiOiJodHRwOlwvXC9taS1saW51eC53bHYuYWMudWtcL34wNzE0MDg5XC9tb21lbnRzXC9hcGlcL2xvZ2luXC9hdXRoIiwiaWF0IjoxNDkyMzA3OTQzLCJleHAiOjE0OTIzMTE1NDMsIm5iZiI6MTQ5MjMwNzk0MywianRpIjoiZjM3ZmQ1YmUwNjkzMmE2MDIzYzZiMjlmNjk2NWQ5NGQifQ.Vx5d4mqJbQTt6UThNA5kLofdIv_VUOkWfgXNZ2X-Whk}');
$I->sendPOST('/delete/post/64');
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseIsJson();
$I->seeResponseContains('{"result":"Post Deleted"}');
