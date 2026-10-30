const EMAIL = 'yuricirino@outlook.com';

async function copiar(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    // A API só existe em HTTPS ou localhost; este é o caminho para os demais casos.
    const campo = document.createElement('textarea');
    campo.value = texto;
    campo.style.position = 'fixed';
    campo.style.opacity = '0';
    document.body.append(campo);
    campo.select();
    const ok = document.execCommand('copy');
    campo.remove();
    return ok;
  }
}

document.querySelectorAll('.copy-email').forEach((botao) => {
  const rotulo = botao.querySelector('span');
  let espera;
  botao.addEventListener('click', async () => {
    const ok = await copiar(EMAIL);
    rotulo.textContent = ok ? 'Copiado!' : 'Não foi possível copiar';
    clearTimeout(espera);
    espera = setTimeout(() => { rotulo.textContent = 'Copiar'; }, 2000);
  });
});
