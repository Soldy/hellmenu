'use strict';

const hellMenuClass = function(main_element_, menus_){
    this.addSection = function(id,title){
        _setSection(id,title);
    };
    this.add = function(id, title, action, icon_class,  section, subs){
        _add(id, title, action, icon_class,  section, subs);
    };
    this.render = function(){
        _render();
    }
    this.hide = function(){
        _menu.className = _class('hide');
    }
    this.show = function(){
        _menu.className = _class('shell');
    }
    const _e = main_element_;
    const _menu  = document.createElement('div');
    const _list_menu_points = {};
    const _list_menus = {};
    const _list_sections = {}; 
    const _add = function(id, title, action, icon_class,  section, subs){
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
    const _addSection = function(id,title){
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
    const _section = function(id){
        let section  = document.createElement('section');
        section.className = ( 
           _class('section')+
           " "+
           _class('section_'+id)
        );
        for(let i of _list_sections[id].menus)
           section.appendChild(
                _menuPoint(
                    _list_menus[i].id,
                    _list_menus[i].title,
                    _list_menus[i].action,
                    _list_menus[i].icon_class,
                    _list_menus[i].subs
                )
            );
        return section;

    }
    const _menuPoint = function(id, title_text, action, icon_class, subs){
        if(typeof icon_class === 'undefined')
            icon_class = '';
        const menu = document.createElement('div');
        const icon = document.createElement('span');
        const title = document.createElement('a');
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
        if(index === -1 )
            return ;
        _list_sections[
            section
        ].menus.splice(index, 1);
    };
    const _menuAddToSection = function (menu,section){
        _addSection(section);
        _menuRemoveFormSection(menu);
        _list_sections[section].menus.push(menu);
        _list_menus[menu].section = section;
    };
    const _render = function(){
        _menu.innerHTML = '';
        for(let i in _list_sections)
            _menu.appendChild(
                _section(i)
            )
    };
    // constructor
    _e.appendChild(_menu)
}


