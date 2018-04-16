<?php 
$I = new ApiTester($scenario);
$I->wantTo('Log A User In Via API');
$I->haveHttpHeader('Content-Type', 'application/x-www-form-urlencoded');
$I->sendPOST('/login/auth', [
							'email' => 'd@berg.com',
						   	'password' => '11111111'
						   ]);
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseIsJson();
$I->seeResponseContains('{"result":"User Logged In Successfully"}');