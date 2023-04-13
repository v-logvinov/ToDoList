function fromServer(owner) {
    const storage = JSON.parse(sessionStorage.getItem(owner)) ?? {};

    return storage?.fromServer;
}

export function createChangeSrcBtn(container, {owner}) {
    const storage = JSON.parse(sessionStorage.getItem(owner));
    const changeSrcBtn = document.createElement('button');
    changeSrcBtn.classList.add('btn', 'btn-primary', 'mb-5');
    changeSrcBtn.textContent = storage?.fromServer ? 'Перейти на локальное хранилище' : 'Перейти на серверное хранилище';

    changeSrcBtn.addEventListener('click', () => {
      sessionStorage.setItem(owner, JSON.stringify({ fromServer: !fromServer(owner) }));
      location.reload();
    });
    container.append(changeSrcBtn);
}

export async function getApi(owner) {
    const apiPath = fromServer(owner) ? "./api.js" : "./local-storage.js";

    return await import(apiPath);
}
