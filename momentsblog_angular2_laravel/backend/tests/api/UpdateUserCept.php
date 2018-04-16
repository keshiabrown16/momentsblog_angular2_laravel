<?php 
$I = new ApiTester($scenario);
$I->wantTo('Update User Detials Via API');
$I->haveHttpHeader('Authorization', 'Bearer {eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cL21pLWxpbnV4Lndsdi5hYy51a1wvfjA3MTQwODlcL21vbWVudHNcL2FwaVwvbG9naW5cL2F1dGgiLCJpYXQiOjE0OTIyOTg3MTYsImV4cCI6MTQ5MjMwMjMxNiwibmJmIjoxNDkyMjk4NzE2LCJqdGkiOiIyNjMwY2JiMDRiYTU3ODAxNDM4NTEwZjJjNDg1YmMyYyJ9._aInUWknQCkwSHro-JtFlmZDNyJMRX1QKhM6Bqgv6aY}');
$I->sendPOST('/user/9', [	'name' => 'John Terry',
							'email' => 'john@terry.com',
							'password' => '22222222'
						   ]);
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseIsJson();
$I->seeResponseContains('{"result":"User Updated"}');
$I->seeResponseContainsJson([
  'message' => 'user updated'
]);