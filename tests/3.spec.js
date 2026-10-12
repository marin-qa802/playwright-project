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
    /*
  const dogs =['Белка', 'Бонд', 'Кейси'];
  console.log(dogs);
  console.log(dogs[0]);
  // длина массива
   console.log(dogs.length);
   console.log(dogs[dogs.length-1]);
    console.log(dogs.includes('Стрелка'));
    // arrange - предусловие - given
    */

   /*
   heap stack
  
   99 - память a1
   let a=99; a1 
   let b=a; a2

    const arr = [''mnml.tech];
 [a3 ссылка на FEFEFE] -> ///idFEFEFE///

 arr
 [a4 ссылка на FEFEFE] -> ///idFEFEFE///

   */
  await page.goto(URL);
  //await page.locator('.tag-pill').click();
  const tags = await page.locator('.tag-pill');

  console.log(tags);
  //await expect(tags).toHaveCount(53);
  await expect(tags).toHaveText(['depraedor']);


/*
const cup = ['Чашка', 'Кружка', 'Бокал'];
const giftForAnzela = cup;
giftForAnzela.push('Кружка с котиком');
console.log(cup);
console.log(giftForAnzela); 

const courses = [
 ['js', 'css', 'git'],
 ['api', 'rabbtmq', 'graphql', 'grpc'],
['ai']
];
console.log(courses[0][0]);
console.log(courses[1]
[courses[1].length-1])
    
*/



  /*
  const email = getEmail();
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill(email);

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);

  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(getPassword(10));

  await page.getByRole('button', { name: 'Sign up' }).click();

// assert - сравниваем фактический и ожидаемый then
  await expect(page.getByRole('navigation')).toContainText(email);
*/
});
