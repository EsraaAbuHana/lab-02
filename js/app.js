'use strict';
// let templateId='#template-img';
let keywordArr = [];
let objArr = [];
console.log(keywordArr);
// creat constructor
function Image(val) {
    this.image_url = val.image_url;
    this.title = val.title;
    this.description = val.description;
    this.keyword = val.keyword;
    this.horns = val.horns;
    objArr.push(this);
}
console.log(objArr);
var page;
$('.page1').on('click', () => {
    $('.container').empty();
    $('.newOption').remove();
    card('./data/page-1.json')
})
$('.page2').on('click', () => {
    $('.container').empty();
    $('.newOption').remove();
    card('./data/page-2.json')
})

function card(page) {

    $.ajax(`${page}`)
        .then(data => {
            data.forEach(element => {
                let newImage = new Image(element);
                newImage.render();
                if (!(keywordArr.includes(newImage.keyword))) {
                    keywordArr.push(newImage.keyword);
                    addOption(newImage);
                }
            });
            ;
        }

        )
    // to html function
    Image.prototype.toHtml = function () {
        let template = $('#template-img').html();
        let newCard = Mustache.render(template, this);
        return newCard;
    }

    Image.prototype.render = function () {
        let divClone = this.toHtml();
        $('.container').append(divClone);
    };


    // response to select
    $('select').on('change', function () {
        $('.container').empty();
        // $('.container').html("");


        let choosenImage = ($(this).val());
        $.ajax(`${page}`)
            .then(data => {
                data.forEach(element => {
                    if (element.keyword === choosenImage) {
                        let newImage = new Image(element);
                        newImage.render();
                    }
                })

            })

    })

    function addOption(newImage) {
        let optionClone = $('.optionImg').clone();
        optionClone.removeClass('optionImg');
        optionClone.text(newImage.keyword);
        optionClone.attr('value', `${newImage.keyword}`)
        $('#selectImg').append(optionClone);
    };
}
// sort
// var selectedOption = $("#sortImg option:selected").html();
console.log(selectedOption);

// if ($('#sortImg'.value=='title')){
Image.prototype.sortBy = function () {
    $('#sortImg').on('change', function () {
        objArr.sort((a, b) => {

            if (a.title.toUpperCase() < b.title.toUpperCase()) {
                addOption();
                return 1;
            }
            else if (a.title.toUpperCase() > b.title.toUpperCase()) {
                addOption();
                return -1;
            }
            else { addOption() };
            return 0;

        });
    })
    // else  {objArr.sort((a,b) => {

    //     if (a.horns.toUpperCase() < b.horns.toUpperCase()){
    //      //  console.log(a.name.toUpperCase())
    //       return 1;
    //     }
    //      else if (a.horns.toUpperCase() > b.horns.toUpperCase()) return -1;
    //      else return 0;
    //  });}
}
