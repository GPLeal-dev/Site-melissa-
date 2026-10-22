// ========================================
// TRADUÇÃO (PT / JA)
// ========================================
// Objeto com todos os textos do site em português e japonês.
// Cada chave corresponde a um atributo data-i18n usado no HTML.
// Para editar um texto, basta alterar o valor correspondente aqui.

const translations = {

  pt: {
    // NAVEGAÇÃO
    "nav.inicio": "Início",
    "nav.procedimentos": "Procedimentos",
    "nav.sobre": "Sobre",
    "nav.atendimento": "Atendimento",
    "nav.duvidas": "Dúvidas",
    "nav.contato": "Contato",
    "nav.agendar": "Agendar atendimento",

    // HERO
    "hero.nome": "Melissa Yumi Okuno",
    "hero.marca": "Método Massoterapia",
    "hero.headline": "Cuidado, equilíbrio e bem-estar onde você estiver.",
    "hero.texto": "Massagens e experiências de bem-estar com atendimento domiciliar personalizado, levando conforto, cuidado e tranquilidade até você.",
    "hero.atendimento_domiciliar": "Atendimento domiciliar",
    "hero.dias": "Segunda a sexta",
    "hero.horario": "08:30 às 20:30",
    "hero.btn_contato": "Entre em contato",
    "hero.btn_procedimentos": "Conhecer procedimentos",

    // INTRODUÇÃO
    "intro.titulo": "UM MOMENTO PARA CUIDAR DE VOCÊ",
    "intro.headline": "Desacelerar também é uma forma de cuidado.",
    "intro.texto": "Em meio à rotina, reservar um momento para desacelerar também é uma forma de cuidado. Cada atendimento é realizado de maneira personalizada, respeitando suas necessidades e proporcionando uma experiência dedicada ao relaxamento, conforto e bem-estar.",
    "intro.destaque": "E o melhor: o atendimento acontece no conforto da sua casa.",
    "intro.cta": "Quero agendar meu atendimento",

    // PROCEDIMENTOS - TÍTULO GERAL
    "procedimentos.titulo": "PROCEDIMENTOS",
    "procedimentos.headline": "Encontre o cuidado ideal para o seu momento.",
    "card.saiba_mais": "Saiba mais",
    "card.agendar": "Agendar",

    // CARD - MASSAGEM RELAXANTE
    "card.relaxante.categoria": "Bem-estar",
    "card.relaxante.nome": "Massagem Relaxante",
    "card.relaxante.resumo": "Movimentos suaves e contínuos para desacelerar o corpo e a mente.",
    "modal.relaxante.texto": "Uma experiência pensada para desacelerar o corpo e a mente. Por meio de movimentos suaves, contínuos e deslizamentos cuidadosamente aplicados, a massagem relaxante favorece a sensação de bem-estar e contribui para aliviar as tensões acumuladas pela rotina. Ideal para quem busca relaxamento, conforto, descanso, sensação de leveza e autocuidado.",

    // CARD - DRENAGEM LINFÁTICA
    "card.drenagem.categoria": "Terapêutico",
    "card.drenagem.nome": "Drenagem Linfática",
    "card.drenagem.resumo": "Movimentos suaves e rítmicos direcionados ao sistema linfático.",
    "modal.drenagem.texto": "Técnica realizada com movimentos suaves, lentos e rítmicos, direcionados ao sistema linfático. O atendimento proporciona sensação de leveza e pode auxiliar na redução da sensação de inchaço e retenção de líquidos.",
    "modal.drenagem.aviso": "Atendimentos relacionados a períodos pós-operatórios devem ser realizados somente quando houver indicação e liberação do profissional de saúde responsável.",

    // CARD - MASSAGEM MODELADORA
    "card.modeladora.categoria": "Corporal",
    "card.modeladora.nome": "Massagem Modeladora",
    "card.modeladora.resumo": "Movimentos firmes e estratégicos em regiões específicas do corpo.",
    "modal.modeladora.texto": "Técnica corporal caracterizada por movimentos firmes, rápidos e estratégicos, aplicada em regiões específicas do corpo. Tem como proposta complementar os cuidados estéticos, estimular os tecidos e favorecer uma aparência corporal mais uniforme.",
    "modal.modeladora.aviso": "Resultados podem variar entre pessoas.",

    // CARD - MASSAGEM DESPORTIVA
    "card.desportiva.categoria": "Esportivo",
    "card.desportiva.nome": "Massagem Desportiva",
    "card.desportiva.resumo": "Indicada para regiões submetidas a maior esforço em atividades físicas.",
    "modal.desportiva.texto": "Indicada especialmente para pessoas fisicamente ativas, a massagem desportiva trabalha regiões submetidas a maior esforço durante exercícios e atividades esportivas. Pode contribuir para o relaxamento muscular, conforto e recuperação após exercícios. Ideal para musculação, corrida, artes marciais, esportistas e pessoas fisicamente ativas.",

    // CARD - TERAPIAS CORPORAIS
    "card.terapias.categoria": "Terapêutico",
    "card.terapias.nome": "Terapias Corporais Específicas",
    "card.terapias.resumo": "Técnicas combinadas de pressão, calor e alongamento.",
    "modal.terapias.texto": "Técnicas que combinam diferentes formas de pressão, calor, alongamento e estímulos corporais para proporcionar uma experiência personalizada de relaxamento e cuidado. Inclui Shiatsu, Pedras Quentes, Tailandesa e Ventosaterapia.",

    // CARD - CONE HINDU
    "card.cone.categoria": "Complementar",
    "card.cone.nome": "Cone Hindu",
    "card.cone.resumo": "Prática complementar de bem-estar em ambiente tranquilo.",
    "modal.cone.texto": "Prática complementar de bem-estar realizada em ambiente tranquilo e controlado, buscando proporcionar uma experiência de relaxamento e conforto.",
    "modal.cone.aviso": "Esta é uma prática complementar de bem-estar e não substitui avaliação, diagnóstico ou tratamento realizado por profissionais de saúde.",

    // CARD - MASSAGEM COM VELAS
    "card.velas.categoria": "Sensorial",
    "card.velas.nome": "Massagem com Velas",
    "card.velas.resumo": "Experiência sensorial com óleo corporal morno e toque suave.",
    "modal.velas.subtitulo": "Candle Massage",
    "modal.velas.texto": "Uma experiência sensorial que combina massagem, aroma e temperatura agradável. Velas cosméticas desenvolvidas especificamente para massagem transformam-se em óleo corporal morno, aplicado cuidadosamente sobre a pele.",

    // CARD - RELAXAMENTO FACIAL
    "card.facial.categoria": "Bem-estar",
    "card.facial.nome": "Relaxamento Facial e Alívio de Tensões",
    "card.facial.resumo": "Técnicas suaves em face, têmporas e pontos específicos da cabeça.",
    "modal.facial.texto": "Técnicas suaves aplicadas em regiões como face, têmporas e pontos específicos da cabeça podem proporcionar agradável sensação de relaxamento e conforto, especialmente após períodos de estresse e tensão.",
    "modal.facial.aviso": "O atendimento possui finalidade de bem-estar e não representa tratamento para condições médicas.",

    // CTA
    "cta.titulo": "Seu momento de cuidado pode começar em casa.",
    "cta.texto": "Escolha o atendimento que mais combina com você e entre em contato para consultar os horários disponíveis.",
    "cta.botao": "Agendar pelo WhatsApp",

    // SOBRE
    "sobre.titulo": "CONHEÇA",
    "sobre.nome": "Melissa Yumi Okuno",
    "sobre.marca": "Método Massoterapia",
    "sobre.texto1": "Meu propósito é proporcionar momentos de cuidado e bem-estar através de atendimentos personalizados, respeitando as necessidades e particularidades de cada pessoa.",
    "sobre.texto2": "Cada sessão é preparada com atenção aos detalhes para que o atendimento seja confortável, acolhedor e realizado com responsabilidade.",

    // ATENDIMENTO DOMICILIAR
    "atendimento.titulo": "O CUIDADO VAI ATÉ VOCÊ",
    "atendimento.headline": "Atendimento Domiciliar",
    "atendimento.texto": "Desfrute de um momento de cuidado sem precisar enfrentar trânsito, deslocamentos ou salas de espera. O atendimento é realizado no conforto da sua casa, proporcionando mais privacidade, praticidade e tranquilidade.",
    "atendimento.conforto.titulo": "Conforto",
    "atendimento.conforto.texto": "Atendimento no ambiente onde você se sente mais à vontade.",
    "atendimento.praticidade.titulo": "Praticidade",
    "atendimento.praticidade.texto": "Sem necessidade de deslocamento antes ou depois da sessão.",
    "atendimento.personalizado.titulo": "Atendimento Personalizado",
    "atendimento.personalizado.texto": "Cada sessão é preparada considerando as necessidades apresentadas.",
    "atendimento.horarios.titulo": "Horários Flexíveis",

    // COMO FUNCIONA
    "comofunciona.titulo": "Como funciona",
    "comofunciona.passo1": "Escolha seu atendimento",
    "comofunciona.passo2": "Entre em contato",
    "comofunciona.passo3": "Confirme local e horário",
    "comofunciona.passo4": "Receba o atendimento em casa",

    // HORÁRIO
    "horario.titulo": "Horário de Atendimento",
    "horario.aviso": "Atendimento exclusivamente mediante agendamento.",

    // FAQ
    "faq.titulo": "Dúvidas Frequentes",
    "faq.q1": "Como funciona o atendimento domiciliar?",
    "faq.a1": "O atendimento é realizado na sua casa, em horário previamente combinado, trazendo os materiais necessários para a sessão.",
    "faq.q2": "Quais são os horários de atendimento?",
    "faq.q3": "Como faço para agendar?",
    "faq.a3": "Basta entrar em contato pelo WhatsApp para consultar disponibilidade de horário e local.",
    "faq.q4": "Preciso preparar algo antes da massagem?",
    "faq.a4": "Recomenda-se um ambiente tranquilo e roupas confortáveis. Orientações específicas são passadas no agendamento.",
    "faq.q5": "Como escolher a massagem ideal?",
    "faq.a5": "Durante a conversa pelo WhatsApp, é possível indicar a opção mais adequada considerando sua necessidade.",
    "faq.q6": "Quais formas de pagamento são aceitas?",
    "faq.a6": "Informação a ser confirmada. Consulte diretamente pelo WhatsApp.",
    "faq.q7": "Existe alguma contraindicação?",
    "faq.a7": "Algumas condições de saúde podem exigir avaliação prévia. Consulte um profissional de saúde em caso de dúvida.",
    "faq.q8": "Posso realizar uma massagem após cirurgia?",
    "faq.a8": "Atendimentos em períodos pós-operatórios devem ser realizados somente com indicação e liberação do profissional de saúde responsável.",

    // CONTATO
    "contato.titulo": "Entre em Contato",
    "contato.texto": "Fale comigo pelo WhatsApp para tirar dúvidas ou agendar seu atendimento.",
    "contato.botao": "Chamar no WhatsApp",

    // WHATSAPP FLUTUANTE
    "whatsapp.flutuante": "Entre em contato"
  },

  ja: {
    // ナビゲーション
    "nav.inicio": "ホーム",
    "nav.procedimentos": "施術メニュー",
    "nav.sobre": "プロフィール",
    "nav.atendimento": "訪問施術",
    "nav.duvidas": "よくある質問",
    "nav.contato": "お問い合わせ",
    "nav.agendar": "予約する",

    // ヒーロー
    "hero.nome": "メリッサ・ユミ・オクノ",
    "hero.marca": "メソッド・マッサージセラピー",
    "hero.headline": "どこにいても、心地よさと安らぎを。",
    "hero.texto": "訪問マッサージを通じて、あなたのもとへ快適さと安心をお届けします。一人ひとりに合わせた丁寧な施術をご提供いたします。",
    "hero.atendimento_domiciliar": "訪問施術",
    "hero.dias": "月曜日から金曜日",
    "hero.horario": "8時30分から20時30分まで",
    "hero.btn_contato": "お問い合わせ",
    "hero.btn_procedimentos": "施術メニューを見る",

    // イントロダクション
    "intro.titulo": "自分を大切にする時間",
    "intro.headline": "立ち止まることも、大切なセルフケアです。",
    "intro.texto": "忙しい毎日の中で、少し立ち止まる時間を持つこともセルフケアの一つです。施術は一人ひとりに合わせて丁寧に行い、リラックスと快適さを大切にした体験をご提供します。",
    "intro.destaque": "しかも、施術はご自宅の快適な空間で受けていただけます。",
    "intro.cta": "施術を予約する",

    // 施術メニュー全体
    "procedimentos.titulo": "施術メニュー",
    "procedimentos.headline": "あなたに合った施術を見つけてください。",
    "card.saiba_mais": "詳しく見る",
    "card.agendar": "予約する",

    // リラクゼーションマッサージ
    "card.relaxante.categoria": "リラクゼーション",
    "card.relaxante.nome": "リラクゼーションマッサージ",
    "card.relaxante.resumo": "穏やかで連続的な動きで心と体をゆっくりと解きほぐします。",
    "modal.relaxante.texto": "心と体をゆっくりと落ち着かせるための施術です。やさしく連続的な動きと丁寧なストロークにより、心地よいリラックス感を促し、日々の緊張を和らげるお手伝いをします。リラックス、快適さ、休息、軽やかな感覚、セルフケアを求める方に適しています。",

    // リンパドレナージュ
    "card.drenagem.categoria": "セラピー",
    "card.drenagem.nome": "リンパドレナージュ",
    "card.drenagem.resumo": "リンパ系に働きかける、やさしくリズミカルな動きの施術です。",
    "modal.drenagem.texto": "やさしく、ゆっくりとしたリズミカルな動きでリンパ系に働きかける施術です。軽やかな感覚をもたらし、むくみやすさの軽減をサポートします。",
    "modal.drenagem.aviso": "術後の施術については、担当の医療専門家の指示と許可がある場合にのみ行います。",

    // モデラードマッサージ
    "card.modeladora.categoria": "ボディケア",
    "card.modeladora.nome": "モデラードマッサージ",
    "card.modeladora.resumo": "体の特定部位に行う、力強く戦略的な動きの施術です。",
    "modal.modeladora.texto": "体の特定の部位に対して、力強く素早い戦略的な動きで行う施術です。美容ケアを補完し、組織を刺激して、より均一な体のラインを目指します。",
    "modal.modeladora.aviso": "効果には個人差があります。",

    // スポーツマッサージ
    "card.desportiva.categoria": "スポーツ",
    "card.desportiva.nome": "スポーツマッサージ",
    "card.desportiva.resumo": "運動による負荷がかかった部位に適した施術です。",
    "modal.desportiva.texto": "運動を日常的に行う方に特におすすめの施術です。トレーニングやスポーツ活動で負荷のかかった部位に働きかけます。筋肉のリラックス、快適さ、運動後の回復をサポートします。筋トレ、ランニング、武道など、アクティブな方に適しています。",

    // 特定ボディセラピー
    "card.terapias.categoria": "セラピー",
    "card.terapias.nome": "特定ボディセラピー",
    "card.terapias.resumo": "圧、温熱、ストレッチを組み合わせた施術です。",
    "modal.terapias.texto": "圧、温熱、ストレッチなど、さまざまな刺激を組み合わせ、一人ひとりに合わせたリラックス体験をご提供します。指圧、ホットストーン、タイ古式、カッピングなどを含みます。",

    // コーンヒンドゥー
    "card.cone.categoria": "補完ケア",
    "card.cone.nome": "コーンヒンドゥー",
    "card.cone.resumo": "落ち着いた環境で行う補完的なリラクゼーションケアです。",
    "modal.cone.texto": "静かで管理された環境で行う補完的なウェルネスケアです。リラックスと快適さを目的としています。",
    "modal.cone.aviso": "これは補完的なウェルネスケアであり、医療専門家による診断や治療に代わるものではありません。",

    // キャンドルマッサージ
    "card.velas.categoria": "感覚ケア",
    "card.velas.nome": "キャンドルマッサージ",
    "card.velas.resumo": "温かいオイルとやさしいタッチによる感覚的な体験です。",
    "modal.velas.subtitulo": "キャンドルマッサージ",
    "modal.velas.texto": "マッサージ、香り、心地よい温かさを組み合わせた感覚的な体験です。マッサージ専用のコスメティックキャンドルが温かいボディオイルへと変化し、肌に丁寧に塗布されます。",

    // フェイシャルリラクゼーション
    "card.facial.categoria": "リラクゼーション",
    "card.facial.nome": "フェイシャルリラクゼーション",
    "card.facial.resumo": "顔、こめかみ、頭部への穏やかな施術です。",
    "modal.facial.texto": "顔、こめかみ、頭部の特定のポイントに対する穏やかな施術は、心地よいリラックス感と快適さをもたらし、特にストレスや緊張が続いた後におすすめです。",
    "modal.facial.aviso": "この施術はウェルネスを目的としたものであり、医学的な治療を目的とするものではありません。",

    // CTA
    "cta.titulo": "自宅で始める、あなたのための癒しの時間。",
    "cta.texto": "ご自身に合った施術を選び、空き状況についてお気軽にお問い合わせください。",
    "cta.botao": "WhatsAppで予約する",

    // プロフィール
    "sobre.titulo": "プロフィール",
    "sobre.nome": "メリッサ・ユミ・オクノ",
    "sobre.marca": "メソッド・マッサージセラピー",
    "sobre.texto1": "一人ひとりのニーズや個性を尊重しながら、心地よいケアの時間をご提供することを大切にしています。",
    "sobre.texto2": "すべての施術は細部まで丁寧に準備し、快適で安心できる時間となるよう責任を持って行っています。",

    // 訪問施術
    "atendimento.titulo": "ケアはあなたのもとへ",
    "atendimento.headline": "訪問施術",
    "atendimento.texto": "移動や渋滞、待ち時間を気にすることなく、ご自宅の快適な空間でケアの時間をお過ごしいただけます。プライバシーと利便性、安心感を大切にしています。",
    "atendimento.conforto.titulo": "快適さ",
    "atendimento.conforto.texto": "ご自身が心地よく感じる環境で施術を受けられます。",
    "atendimento.praticidade.titulo": "利便性",
    "atendimento.praticidade.texto": "施術前後の移動が不要です。",
    "atendimento.personalizado.titulo": "個別対応の施術",
    "atendimento.personalizado.texto": "それぞれのニーズに合わせて施術内容を準備します。",
    "atendimento.horarios.titulo": "柔軟な対応時間",

    // ご利用の流れ
    "comofunciona.titulo": "ご利用の流れ",
    "comofunciona.passo1": "施術を選ぶ",
    "comofunciona.passo2": "お問い合わせ",
    "comofunciona.passo3": "場所と時間を確認",
    "comofunciona.passo4": "ご自宅で施術を受ける",

    // 対応時間
    "horario.titulo": "対応時間",
    "horario.aviso": "施術は事前予約制です。",

    // よくある質問
    "faq.titulo": "よくある質問",
    "faq.q1": "訪問施術はどのように行われますか？",
    "faq.a1": "事前に決めた時間にご自宅へ伺い、施術に必要な道具を持参して行います。",
    "faq.q2": "対応時間を教えてください。",
    "faq.q3": "予約はどのようにすればよいですか？",
    "faq.a3": "WhatsAppからお気軽にご連絡ください。空き状況と場所を確認いたします。",
    "faq.q4": "施術前に準備することはありますか？",
    "faq.a4": "落ち着いた環境と楽な服装をおすすめします。詳細は予約時にご案内します。",
    "faq.q5": "自分に合った施術はどう選べばよいですか？",
    "faq.a5": "WhatsAppでのやり取りの中で、ご希望に合った施術をご提案いたします。",
    "faq.q6": "お支払い方法を教えてください。",
    "faq.a6": "現在確認中です。詳細はWhatsAppにて直接お問い合わせください。",
    "faq.q7": "施術を受けられない場合はありますか？",
    "faq.a7": "健康状態によっては事前の確認が必要な場合があります。ご不明な点は医療専門家にご相談ください。",
    "faq.q8": "手術後でも施術を受けられますか？",
    "faq.a8": "術後の施術は、担当の医療専門家の指示と許可がある場合にのみ行います。",

    // お問い合わせ
    "contato.titulo": "お問い合わせ",
    "contato.texto": "ご質問やご予約は、WhatsAppからお気軽にご連絡ください。",
    "contato.botao": "WhatsAppで連絡する",

    // フローティングボタン
    "whatsapp.flutuante": "お問い合わせ"
  }

};