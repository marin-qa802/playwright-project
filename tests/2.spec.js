import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';

const URL = 'https://realworld.qa.guru/';
let secret;


// старый способ
function getEmail(argument) {
let email = faker.internet.email();

return email;

}


const getPassword = (lengthOfPassword) => {
let password = faker.internet.password({length: lengthOfPassword});

return password;

// return faker.internet.password();
}

 test('test', async ({ page }) => {
    // arrange - предусловие - given
  await page.goto(URL);
 // console.log('текст');
 // console.log(secret);
 //  getDog('собака');
//  console.log(getDog('собака'));

  // act - шаги - when

  const email = getEmail();
  await page.getByRole('link', { name: 'Sign up' }).click();
  //await expect(page.getByRole('textbox', { name: 'Your Name' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  //await page.getByRole('textbox', { name: 'Your Name' }).fill(email);
  await page.getByRole('textbox', { name: 'Your Name' }).fill(email);

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);

  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(getPassword(10));

  await page.getByRole('button', { name: 'Sign up' }).click();

// assert - сравниваем фактический и ожидаемый then
  await expect(page.getByRole('navigation')).toContainText(email);

});

/*
'Люба'
"Люба"
`Люба`
3
15.3
true
false

const nameOfDog = 'Белка';
let nameOfSmallDog; 
nameOfSmallDog = 'Стрелка';

let a = '';
let b = ' ';
let c = null;
let d = 0;

function getDog(argument) {
console.log('текст');
console.log(argument);

return argument+1;

}


*/