'use-strict';
let keywordArr=[];
function Image(value) {
    this.image_url=value.image_url;
    this.title=value.title;
    this.description=value.description;
    this.keyword=value.keyword;
    this.horns=value.horns;
    
}
$.ajax('./data/page-1.json')
.then(data=>{
    data.forEach((item)=>{
        console.log(item);
        let newImage = new Image(item);
        console.log(newImage);
        newImage.render();
        if (!(keywordArr.includes(newImage.keyword))) {
         keywordArr.push(newImage.keyword);  
         
         let optionClone=$('.newOption').clone();
         optionClone.removeClass('newOption');
         optionClone.text(newImage.keyword);
         optionClone.attr('value',`${newImage.keyword}`);
         $('select').append(optionClone);
        }

    })

})

console.log(keywordArr);



Image.prototype.render = function(){
    
    let photoClone = $('.photo-template').clone();
    photoClone.removeClass('photo-template');
    photoClone.find('img').attr("src",`${this.image_url}`);

    photoClone.find('h2').text(this.title);
    photoClone.find('p').text(this.description);

    $('.render').append(photoClone);
}

// $('select option').on('click',remove(this));

// $('select').on('change	',function(){
//    $('option'),hide(this).val();
//     console.log($(this));
//     console.log($(this).val());
// })

