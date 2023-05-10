// get getAllnumberofItems(){
//     return $$(`//*[@class="rt-tr-group"]`)
//   }
//   async allNumberofItems(){
//     let result = await this.getAllnumberofItems.length;
//     return result;
//   }
//   async clickLogin(){
//     await this.click(await this.getLoginBtn);
//   }
//   async nameHeader(){
//     return this.getNameHeader
//   }
//   get getTitle(){
//     return $$(`.mr-2 > a`)
//   }
//   get getAuthor(){
//     return $$(`//*[@class="rt-tr-group"]//div[3]`)
//   }
//   get getPublisher(){
//     return $$(`//*[@class="rt-tr-group"]//div[4]`)
//   }

//   async getAllDataOfItem_1(testid: string) {
//     const items = [];

//     // Loop through the name elements and create a new item object for each one
//     let a = await this.allNumberofItems.length;
//     for (let i = 0; i < a; i++) {
//       const nameElement = await this.getTitle[i];
//       const descElement = await this.getAuthor[i];
//       const priceElement = await this.getPublisher[i];
//       const item = {
//         Title: await nameElement.getText(),
//         Author: await descElement.getText(),
//         Publisher: await priceElement.getText(),
//       };
//       items.push(item);
//     }

//     return items;
//   }


//   async getAllDataOfItem(testid: string) {
//     const output = [];
//     const elements = await this.getAllnumberofItems;
//     console.log('---------------------')
//     for (let e of elements) {
//         console.log(e)
//       const Title = await (await e.$(`a`)).getText();
//       console.log(Title)
//       const Author = await (await e.$(`.//div[3]`)).getText();
//       console.log(Author)
//       const Publisher = await (await e.$(`.//div[4]`)).getText();
//       console.log(Publisher)
//       output.push({ Title, Author, Publisher });
//     }
//     return output;
//   }