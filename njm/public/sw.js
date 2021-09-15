self.addEventListener('fetch', ev => {
	// Nothing to do
	ev.respondWith(
		fetch(ev.request)
		.catch(e => {
			console.error(e, ev.request);
			return new Response(`Offline. Service Worker @${version}\n${e}`, { status: 200, statusText: 'NG SW' });
		})
	);
});
