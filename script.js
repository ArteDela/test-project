'use strict'
let mainObject =
{
	counter: 0,
	popup:
	{
		outListener:false,
		overlay: document.querySelector('._overlay'),
		open(contentClass, storeName)
		{
			this.removeListner();
			this.removeScroll()
			let popupHtml = document.querySelector(contentClass).innerHTML
			this.overlay.classList.add('open')
			this.overlay.innerHTML = popupHtml
			let popup = this.overlay.querySelector('._popup-content')
			popup.querySelector('._counter').innerHTML = localStorage.getItem(storeName)
			let self = this;
			if(+localStorage.getItem(storeName) != 0)
				mainObject.counter += +localStorage.getItem(storeName)
			setTimeout(function()
			{
				self.outListener = mainObject.clickOutside(popup, () => {
					self.close();
				});
			},10);
		},
		close()
		{
			this.addScroll()
			this.overlay.classList.remove('open')
			mainObject.counter = 0;
			this.removeListner();
		},
		removeListner()
		{
			if(this.outListener)
				document.removeEventListener('click', this.outListener);
		},
		removeScroll()
		{
			document.querySelector('html').style.overflow = 'hidden'
			document.querySelector('body').style.overflow = 'hidden'
		},
		addScroll()
		{
			document.querySelector('html').style.overflow = 'auto'
			document.querySelector('body').style.overflow = 'auto'
		}
	},
	cart:
	{
		add(instance, storeName)
		{
			this.eventCart('add', instance, storeName)
		},
		remove(instance, storeName)
		{
			if(mainObject.counter <= 0) return;
			this.eventCart('remove', instance, storeName)
		},
		eventCart(action, instance, storeName)
		{
			let counterBlock = instance.closest('._popup-content').querySelector('._counter')
			action === 'add' ? mainObject.counter++ : mainObject.counter--
			counterBlock.innerHTML = mainObject.localStorageValue(storeName);
		}
	},
	localStorageValue(storeName)
	{
		localStorage.setItem(storeName, mainObject.counter);
		let localStorageVal = localStorage.getItem(storeName);
		return localStorageVal
	},
	clickOutside(element, callback)
	{
		const outsideChecker = (event) =>
		{
			if (event.target.querySelector('._popup-content'))
			{
				document.removeEventListener('click', outsideChecker);
				callback();
			}
		};

		document.addEventListener('click', outsideChecker);
		return outsideChecker;
	},
}