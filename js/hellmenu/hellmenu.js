'use strict';

const hellMenuClass = function(main_element_){
    this.setSection = function(id,title){
        return _setSection(id,title);
    };
    this.setMenu = function(id, title, action, icon_class,  section, subs){
        _list_menus[id] = {
             id,
             title,
             action,
             icon_class,
             section,
             childs:{}
        };
        if(typeof section !== 'string')
            section = 'main';
        if(typeof subs !== 'undefined')
            _list_menus[id].subs;
        _menuAddToSection(id,section)
    };
    this.render = function(){
        _render();
    }
    const _e = main_element_;
    const _menu  = document.createElement('div');
    const _list_menu_points = {};
    const _list_menus = {};
    const _list_sections = {}; 
    const _setSection = function(id,title){
        if(typeof _list_sections[id] === 'undefined')
            _list_sections[id] = {
                 menus:[]
            };
        if(typeof title === 'string')
           _list_sections[id].title = title;
    };
    const _class = (name)=>{
        return ('hellmenu_'+name);
    };
    const _section = function(section){
        let out  = document.createElement('section');
        for(let i of _list_sections[section].menus)
           out.appendChild(
                _menuPoint(
                    _list_menus[i].id,
                    _list_menus[i].title,
                    _list_menus[i].action,
                    _list_menus[i].icon_class,
                    _list_menus[i].subs
                )
            );
            return out;

    }
    const _menuPoint = function(id, title_text, action, icon_class, subs){
        if(typeof icon_class === 'undefined')
            icon_class = '';
        const menu = document.createElement('div');
        const icon = document.createElement('span');
        const title = document.createElement('span');
        menu.className = _class('line');
        icon.className  = _class('menuitem_icon '+icon_class);
        title.className = _class('text');
        title.appendChild(
            document.createTextNode(title_text)
        );
        menu.appendChild(
            icon
        );
        menu.appendChild(
            title
        );
        menu.setAttribute('id', id);
        icon.addEventListener(
            'click',
            action,
            false
        );
        title.addEventListener(
            'click',
            action,
            false
        );
        if(Array.isArray(subs))
            for(let i of subs)
                menu.appendChild(
                    _subPoint(i.id, i.icon_class, i.action)
                );
        return menu;
    };
    const _subPoint=function(id,icon_class,action){
        const sub = document.createElement('span');
        sub.setAttribute('id', id);
        sub.addEventListener(
            'click',
            action,
            false
        );
        return sub;

    }
    const _menuTextChange = function(id, title){
        const el = (
            document.getElementById(id)
        ).getElementsByClassName('title')[0];
        el.innerHtml='';
        el.appendChild(
            document.createTextNode(title)
        );
    };
    const _menuIconChange = function(id, icon){
        const el = (
             document.getElementById(id)
        ).getElementsByClassName('icon')[0];
        el.innerHtml='';
        el.className = ('menuitem_icon '+icon)
    };
    const _menuRemoveFormSection = function(menu){
        if(typeof _list_menus[menu].section !== 'string')
            return ;
        const section = _list_menus[menu].section;
        const index = _list_sections[
            section
        ].menus.indexOf(menu);
        if(indexOf === -1 )
            return ;
        _list_sections[
            section
        ].menus.splice(index, 1);
    };
    const _menuAddToSection = function (menu,section){
        _setSection(section);
        _menuRemoveFormSection(menu);
        _list_sections[section].menus.push(menu);
        _list_menus[menu].section = section;
    };
    const _render = function(){
        _e.innerHtml = '';
        for(let i in _list_sections)
            _e.appendChild(
                _section(i)
            )

    };
    // constructor
}


