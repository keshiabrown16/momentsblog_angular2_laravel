<?php 
$I = new ApiTester($scenario);
$I->wantTo('create a user via API');
$I->haveHttpHeader('Content-Type', 'application/x-www-form-urlencoded');
$I->sendPOST('/register', ['name' => 'Dennis Bergkamp', 'password' => '11111111', 'email' => 'd@berg.com']);
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseIsJson();
$I->seeResponseContains('{"result":"User Created"}');
$I->seeResponseContainsJson([
  'user' => [
      'name' => 'Dennis Bergkamp',
      'email' => 'd@berg.com',
      'status' => 'inactive'
  ]
]);