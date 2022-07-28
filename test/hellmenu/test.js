window.onload=function(){
    const hellMenu = new hellMenuClass(document.getElementsByTagName('body')[0]);
    hellMenu.setMenu(
        'test1',
        'Test menu 1',
        ()=>{alert('test 1 action')},
        'test_icon_1',
        'main'
    );
    hellMenu.setMenu(
        'test2',
        'Test menu 2',
        ()=>{alert('test 2 action')},
        'test_icon_2',
        'main'
    );
    hellMenu.setMenu(
        'test3',
        'Test menu 3',
        ()=>{alert('test 2 action')},
        'test_icon_2',
        'other'
    );
    hellMenu.render();
}
