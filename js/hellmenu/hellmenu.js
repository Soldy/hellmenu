'use strict';

const hellMenuClass = function(main_element_){
    this.setSection = function(id,title){
        _list_sections[id] = title;

    };
    this.setMenu = function(id, title, action, icon_class,  section, subs){
        _list_menu[id] = {
             id,
             title,
             icon_class,
             subs,
             section
        };
    };
    this.render = function(){
        _render();
    }
    const _e = main_element_;
    const _menu_section   = document.createElement('section');
    const _list_menu_points = [];
    const _list_sections = {};
    const _class = (name)=>{
        return ('hellmenu_'+name);
    };
    const _menuPoint = function(id, title_text, action, icon_class){
        if(typeof icon_class === 'undefined')
            icon_class = '';
        const menu = document.createElement('div');
        const icon = document.createElement('span');
        const title = document.createElement('span');
        icon.className  = _class('menuitem_icon '+icon_class);
        title.className = _class('text');
        title.appendChild(
            document.createTextNode(title)
        );
        menu.appendChild(
            icon
        );
        menu.appendChild(
            title_text
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
    const _render = function(){
        _e.innerHtml = '';
    };
    // constructor
    _menu_section.className = 'section';
    _menu_section.setAttribute('id', 'menu_section');
    _script_section.className = 'section';
    _script_section.setAttribute('id', 'script_section');
}

