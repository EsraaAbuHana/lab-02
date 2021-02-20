'use strict';
// let templateId='#template-img';
// let objArr = [];

card('./data/page-1.json');
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
    let keywordArr = [];
    function Image(val) {
        this.image_url = val.image_url;
        this.title = val.title;
        this.description = val.description;
        this.keyword = val.keyword;
        this.horns = val.horns;
        // objArr.push(this);
    }
    Image.all = [];
    Image.choosenImage = [];
    $.ajax(`${page}`)
        .then(data => {
            data.forEach(element => {
                let newImage = new Image(element);
                Image.all.push(newImage);
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
    $('.selectImg').on('change', function () {
        $('.container').empty();

        sortOption();
        Image.choosenImage = [];

        let choice = ($(this).val());
        Image.all.forEach(element => {
            if (element.keyword ===choice) {
                Image.choosenImage.push(element);
                element.render();
            }
        })
       

    })

    function addOption(newImage) {
        let optionClone = $('.optionImg').clone();
        optionClone.removeClass('optionImg');
        optionClone.text(newImage.keyword);
        optionClone.attr('value', `${newImage.keyword}`)
        optionClone.attr('class', 'newOption')
        $('.selectImg').append(optionClone);
    };



    $('.sort').on('change', function () {
        $('.container').empty();
    
        let choice = $(this).val();
        if (Image.choosenImage[0]) {
            sortChoice(choice, Image.choosenImage);
    
    
        } else {
            sortChoice(choice, Image.all);
        }
    
    
    
    
    });
    
    function sortChoice(choice, sortRender) {
        if (choice === 'title') {
            sortByTitle(sortRender)
        }
        if (choice === 'horns') {
            sortByHorns(sortRender)
    
        }
        sortRender.forEach(element => {
    
            element.render();
        })
    };
    function sortByTitle(arr) {
        arr.sort((a, b) => {
            if (a.title.toUpperCase() > b.title.toUpperCase()) {
                return 1;
            } else if (a.title.toUpperCase() < b.title.toUpperCase()) {
                return -1;
            } else {
                return 0;
            }
        })
    
    
    };
    function sortByHorns(arr) {
        arr.sort((a, b) => {
            if (a.horns > b.horns) {
                return 1;
            } else if (a.horns < b.horns) {
                return -1;
            } else {
                return 0;
            }
        })
    
    };
    sortOption();
    function sortOption() {
        $('.newSort').remove();
        let choices = ['title', 'horns'];
        choices.forEach(element => {
            let optionClone = $('.sortOption').clone();
            optionClone.removeClass('sortOption');
            optionClone.addClass('newSort');
    
            optionClone.text(`${element}`);
            optionClone.attr('value', `${element}`);
            $('.sort').append(optionClone)
        })
    }

}
