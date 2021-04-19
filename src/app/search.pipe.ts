import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allProducts:any,searchTerm:any) {
    if(searchTerm == undefined || searchTerm == ''){
      return allProducts;
    }
    let found =[];
    found = allProducts.filter((data)=>{
      console.log(data);
      
      return data.Name.toLowerCase().includes(searchTerm);
    })

    console.log(found);
    
    return found;
  }

}
