self.addEventListener('fetch', ev => {
	// Nothing to do
	ev.respondWith(
		fetch(ev.request)
		.catch(e => {
			console.error(e, ev.request);
			return new Response(`Offline. joinmisskey Service Worker\n${e}`, { status: 200, statusText: 'NG SW' });
		})
	);
});
