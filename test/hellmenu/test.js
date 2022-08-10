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
        ()=>{alert('test 3 action')},
        'test_icon_2',
        'other'
    );
    hellMenu.addSub(
        'test4',
        'Test menu 4',
        ()=>{alert('test 4 action')},
        'test_icon_2',
        'test3'
    );
    document.getElementsByTagName('body')[0].appendChild(
        hellMenu.render()
    );
}
