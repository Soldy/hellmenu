window.onload=function(){
    window.hellMenu = new hellMenuClass(document.getElementsByTagName('body')[0]);
    hellMenu.add(
        'test1',
        'Test menu 1',
        ()=>{alert('test 1 action')},
        'test_icon_1',
        'main'
    );
    hellMenu.add(
        'test2',
        'Test menu 2',
        ()=>{alert('test 2 action')},
        'test_icon_2',
        'main'
    );
    hellMenu.add(
        'test3',
        'Test menu 3',
        ()=>{alert('test 2 action')},
        'test_icon_2',
        'other'
    );
    hellMenu.render();
}
