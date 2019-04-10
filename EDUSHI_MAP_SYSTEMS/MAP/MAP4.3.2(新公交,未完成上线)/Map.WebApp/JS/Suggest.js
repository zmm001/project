function Suggest(x, y, w, c)
{
    //@公有方法
    this.Show = function(wordList, x, y, w)
    {
        this.SelectedIndex  = -1;
        this.WordList = wordList;
        if (wordList.length < 1)
        {
            this.Hide();
            return;
        }
        this.SuggestPannel.style.display = 'block';
        this.SuggestPannel.style.left = x + 'px';
        this.SuggestPannel.style.top = y + 'px';
        this.SuggestPannel.style.width = w + 'px';
        this._loadData();
    };
    this.Hide = function()
    {
        this.SuggestPannel.style.display = 'none';
    };
    this.KeycodeChange = function(keyCode)
    {
        if (keyCode == 38) //up
        {
            if (this.SelectedIndex > 0) 
                this.SelectedIndex--;
            else
                this.SelectedIndex = this.WordList.length - 1;
            this._selectItem();
        }
        else if (keyCode == 40) //down
        {
            if (this.SelectedIndex < this.WordList.length - 1) 
                this.SelectedIndex++;
            else
                this.SelectedIndex = 0;
            this._selectItem();
        }
        else if (keyCode == 9)
        {
            this.Hide();
        }
        else if (keyCode == 13)
        {
            if (this.SelectedIndex > -1 && this.WordList.length > 0)
            {
                this.SelectedIndexChanged(this.WordList[this.SelectedIndex]);
            }
            this.Hide();
        }
    };
    
    //@属性
    this.LastKeyword = '';
    this.SuggestPannel;
    this.SelectedIndex = -1;
    this.WordList = [];
    this.Width = 200;
    
    //@事件
    this.SelectedIndexChanged = function(item){};
        
    //@构造
    (function()
    {
        //创建suggest面板
        this.Width = w;
        this.SuggestPannel = document.createElement('div');
        this.SuggestPannel.style.cssText = 'width:' + w + 'px; height:auto; border:solid 1px #666; position:absolute; z-index:999999; top:' + y + 'px; left:' + x + 'px; background-color:#fff;';
        if (typeof c == 'undefined') c = document.body;
        c.appendChild(this.SuggestPannel);    
        
        this.SuggestPannel.CloseButton = document.createElement('div');
        this.SuggestPannel.CloseButton.style.cssText = 'text-align:right; padding:5px; cursor:pointer; color:blue;';
        this.SuggestPannel.CloseButton.innerHTML = '关闭';
        
        this.SuggestPannel.WordList = document.createElement('ul');
        this.SuggestPannel.WordList.style.padding = '0 5px';
        this.SuggestPannel.appendChild(this.SuggestPannel.WordList);
        this.SuggestPannel.appendChild(this.SuggestPannel.CloseButton);         
        
        //绑定事件
        var suggest = this;
        this.SuggestPannel.CloseButton.onclick = function()
        {
            suggest.Hide();
        };
        this.Hide();    
    }).call(this);
    
    //@私有方法
    this._selectItem = function()
    {
        if (this.WordList.length > 0)
        {
            for (var i=0; i<this.WordList.length; i++)
            {
                if (i == this.SelectedIndex)
                {
                    this.SuggestPannel.WordList.childNodes[i].style.cssText = 'width:100%;cursor:default; white-space:nowrap;overflow:hidden; background-color: #3068c5; color:#fff;';
                }
                else
                {
                    this.SuggestPannel.WordList.childNodes[i].style.cssText = 'width:100%;cursor:default; white-space:nowrap;overflow:hidden;';
                }
            }
            //this.SelectedIndexChanged(this.WordList[this.SelectedIndex]);
        }
    };
    
    this._loadData = function()
    {
        var suggest = this;
        this.SuggestPannel.WordList.innerHTML = '';
        for (var i=0; i<this.WordList.length; i++)
        {
            var li = document.createElement('li');
            li.style.cssText = 'width:100%;cursor:default; white-space:nowrap;overflow:hidden';
            li.innerHTML = this.WordList[i].Title;
            li.itemIndex = i;
            li.onmouseover = function(){
                suggest.SelectedIndex = this.itemIndex;
                suggest._selectItem();
            };
            li.onclick = function(){
                suggest.SelectedIndexChanged(suggest.WordList[this.itemIndex]);
                suggest.Hide();
            };
            this.SuggestPannel.WordList.appendChild(li);
        }
    };
}