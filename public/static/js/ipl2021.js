 if(checkElement('iplSlider')){
     window.addEventListener('load', ()=>{
         setTimeout(()=>{
            var iplglide = new Glide('#iplSlider',{
                type: 'slider',
                perView: 1,
                rewind: true
            });
            iplglide.mount()
         },3000)
     })       
}

 if(checkElement('iplstoriesSlider')){
    window.addEventListener('load', ()=>{
        setTimeout(()=>{
            var iplstories = new Glide('#iplstoriesSlider',{
                type: 'slider',
                perView: 1,
                rewind: true
            });
            iplstories.mount()
        },3000)
    })              
}
     
