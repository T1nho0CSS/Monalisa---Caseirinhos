// ===== TROQUE AQUI: número com código do país + DDD, só dígitos (ex.: 5518999999999)
const WHATS = "5518988105115";

// Se os emojis ainda aparecerem como � no WhatsApp, troque true por false
const USAR_EMOJIS = true;
const em = codigo => USAR_EMOJIS ? String.fromCodePoint(codigo) + " " : "";

const CORES = [["Rosa","#D58BA5"],["Dourado","#B8893C"],["Azul-marinho","#1F3A8A"],["Lilás","#8F6BC2"],["Azul-bebê","#6CC3D9"],["Verde-sálvia","#7F9A7B"]];
let corAtual = CORES[0][0];

const sw = document.getElementById("sw");
const hero = document.getElementById("heroCookie");
CORES.forEach(([nome, hex], i) => {
  const b = document.createElement("button");
  b.type = "button"; b.style.setProperty("--c", hex);
  b.setAttribute("aria-label", nome); b.setAttribute("aria-pressed", i === 0);
  b.addEventListener("click", () => {
    corAtual = nome;
    document.documentElement.style.setProperty("--ribbon", hex);
    sw.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
    document.getElementById("ribName").textContent = nome;
    document.getElementById("ribChip").textContent = nome;
    hero.classList.remove("wig"); void hero.getBoundingClientRect(); hero.classList.add("wig");
  });
  sw.appendChild(b);
});

// Fotos reais: se data-photo tiver um caminho, a foto substitui o desenho
document.querySelectorAll("[data-photo]").forEach(el => {
  if (el.dataset.photo) el.innerHTML = `<img src="${el.dataset.photo}" alt="${el.dataset.alt || ""}" loading="lazy">`;
});

// Botões "Pedir este" já escolhem o item no formulário
document.querySelectorAll(".pick").forEach(a => a.addEventListener("click", () => {
  document.getElementById("tipo").value = a.dataset.kind;
}));

// Monta a mensagem e abre o WhatsApp
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const data = f.get("data") ? new Date(f.get("data") + "T12:00").toLocaleDateString("pt-BR") : "";
  const detalhes = [
    `${em(0x1F388)}Ocasião: ${f.get("ocasiao")}`,
    `${em(0x1F381)}Item: ${f.get("tipo")}`,
    f.get("qtd") && `${em(0x1F522)}Quantidade: ${f.get("qtd")}`,
    data && `${em(0x1F4C5)}Data do evento: ${data}`,
    `${em(0x1F380)}Cor do laço: ${corAtual}`,
    f.get("obs") && `${em(0x1F4DD)}Personalização: ${f.get("obs")}`
  ].filter(Boolean);
  const msg = [
    `Olá! ${em(0x1F36A)}Aqui é *${f.get("nome")}* e vim pelo site.`,
    `Gostaria de um orçamento:`,
    ``,
    ...detalhes,
    ``,
    `Fico no aguardo! ${em(0x1F49B)}`.trim()
  ].join("\n");
  window.open(`https://api.whatsapp.com/send?phone=${WHATS}&text=${encodeURIComponent(msg)}`, "_blank", "noopener");
});

document.getElementById("ano").textContent = new Date().getFullYear();
