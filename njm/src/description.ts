const descriptionTag = document.querySelector('meta[name=\'description\']');

export function setDescription(title: string, description: string) {
    document.title = title;
    descriptionTag?.setAttribute('content', description);
}
