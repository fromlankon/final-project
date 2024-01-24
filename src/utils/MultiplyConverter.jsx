export default function MultiplyConverter(e) {
    const files = e.target.files;
    const promises = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const promise = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (err) => {
                reject(err);
            };
        });
        promises.push(promise);
    }

    return Promise.all(promises);
}