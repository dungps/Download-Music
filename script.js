window.onload = function() {
	var haveURL = false;
	audio_files = document.querySelectorAll('audio');
	if ( audio_files.length > 0 ) {
		parent_div = document.createElement('div');
		parent_div.className = 'oryc-dropdown';
		parent_div.style.position = 'fixed';
		parent_div.style.top = 0;
		parent_div.style.left = 0;
		parent_div.style.zIndex = 100000000;
		parent_div.style.backgroundColor = '#fff';

		a = document.createElement( 'a' );
		a.dataset.target = 'oryc-link-dropdown';
		a.className = 'oryc-dropdown-button';
		a.href = '#';
		text = document.createTextNode('Download');
		a.appendChild(text);
		parent_div.appendChild(a);

		ul = document.createElement('ul');
		ul.style.position = 'absolute';
		ul.style.top = '100%';
		ul.style.left = 0;
		ul.style.zIndex = 1000;
		ul.style.display = 'none';
		ul.style.float = 'left';
		ul.style.minWidth = '160px';
		ul.style.padding = '5px 0';
		ul.style.margin = '2px 0 0';
		ul.style.textAlign = 'left';
		ul.style.listStyle = 'none';
		ul.style.backgroundColor = '#fff';
		ul.style.border = '1px solid rgba(0,0,0,.15)';
		ul.dataset.show = 'false';
		for( var i = 0; i < audio_files.length; i++ ) {
			src = false;
			title = 'Download';
			if ( audio_files[i].src ) {
				src = audio_files[i].src;
			}

			if ( audio_files[i].title ) {
				title = audio_files[i].title;
			}

			if ( !src ) {
				sources = audio_files[i].querySelectorAll('source');
				for ( var y = 0; y < sources.length; y++ ) {
					var text = document.createTextNode(title);
					newtitle = title.split(' ');
					newtitle = newtitle.join('-');
					newtitle = newtitle + '.mp3';
					if ( sources[y].src ) {
						src = sources[y].src;
					}

					if ( !src ) continue;

					li = document.createElement('li');
					childA = document.createElement('a');
					childA.href = src;
					childA.download = newtitle;
					childA.style.height = '20px';
					childA.style.padding = '5px';
					childA.appendChild(text);
					li.appendChild(childA);
					ul.appendChild(li);
					haveURL = true;
				}
			} else if ( src ) {
				var text = document.createTextNode(title);
				newtitle = title.split(' ');
				newtitle = newtitle.join('-');
				newtitle = newtitle + '.mp3';
				li = document.createElement('li');
				childA = document.createElement('a');
				childA.href = src;
				childA.download = newtitle;
				childA.style.height = '20px';
				childA.style.padding = '5px';
				childA.appendChild(text);
				li.appendChild(childA);
				ul.appendChild(li);
				haveURL = true;
			} else {
				if ( !haveURL ) haveURL = false;
				continue;
			}
		}
		// html += '</ul></div>';
		// console.log( parent_div );
		if ( haveURL ) {
			parent_div.appendChild(ul);
			document.querySelector('body').appendChild(parent_div);
		}
	}

	document.querySelector('.oryc-dropdown>a').addEventListener('click',function(e){
		e.preventDefault();
		ul = document.querySelector('.oryc-dropdown>ul');
		if ( 'false' == ul.dataset.show ) {
			ul.style.display = 'block';
			ul.dataset.show = 'true';
		} else {
			ul.style.display = 'none';
			ul.dataset.show = 'false';
		}
	})
}