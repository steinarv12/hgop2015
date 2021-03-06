# Tækni

## Vagrant

Hugbúnaður sem setur upp sýndarvélar. Notandinn setur inn þær stillingar sem hann vill og Vagrant sér um að setja allt upp m.v. hvernig Vagrantfile skráin er sett upp. Mjög þægilegt til þess bæði að sleppa við tíma í að setja upp vélina handvirkt og að fá sömu niðurstöðu í hvert sinn sem vél er sett upp.

### Day 2 viðbót

Config kerfi sem þetta halda utan um innihald véla og, líkt og Puppet, hjálpa okkur að halda utan um vélarnar sem allt umhverfið keyrir á. Passa upp á að það þurfi ekki að setja þær handvirkt upp með tilheyrandi villutíðni.

## VirtualBox

VirtualBox er hugbúnaður sem býr til og sér um sýndarvélar.

## Grunt

Grunt er forrit sem sér um að keyra JavaScript verkefni út frá stillingaskrá. Þessi verkefni eru oftast þess eðlis að sjálfvirknivæða hluti eins og að þýða LESS og CASS, setja saman JavaScript skrár og "uglifia" þær sem dæmi. Oftast er Grunt nýtt í að sjálfvirknivæða þessa ferla.

### Day 2 viðbót

Hjálpar okkur að sjálfvirknivæða keyrslu á prófunum svo ekki þurfi að keyra þau handvirkt, sem er "antipattern".

## npm

NPM (Node Package Manager) er pakkakerfi fyrir Node.js. Kerfið sér um að halda utan um útgáfur og uppsetningu á pökkum (forritum) sem, oft, koma Node.js við og snúast þessir pakkr að vefþjónustu parti vefþróunar.

### Day 2 viðbót

Svona pakkakerfi hjálpa okkur að halda utan um umhverfið svo ekki þurfi að passa handvirkt upp á að allir hlutir séu í réttri útgáfu.

## nodejs

NodeJS er vefþróunarforrit sem byggir á V8 JavaScript vélinni frá Google. NodeJS keyrir vefþjónustur skrifaðar í JavaScript. NodeJS er opinn hugbúnaður sem keyrir á OS X, Linux, Windows, FreeBSD o.fl. og er hefur því fengið all miklar vinsældir.

## bower

Bower, eins og NPM, er pakkakerfi nema fyrir framendaforritun. Angular, jquery, bootstrap o.fl.

## Git

Auka viðbót við listann sem mér fannst vanta.

Git sér um að halda utan um allan kóða hjá okkur, útgáfur af honum og tilgang með athugasemdum í commit.

### Day 2 viðbót

Sama og NPM, pakkakerfi sem hjálpar okkur að halda öllum framendakeyrslum í sömu útgáfu.

# Day 2 topology

Við höfum komið upp kerfi sem sér um að halda utan um production-test vélina okkar með Vagrant og kerfi til að halda utan um nýjustu útgáfu verkefnis með Docker. Forritin sem nefnd eru hér að ofan hjálpa öll til og eru komin í fulla notkun að passa upp á að ef vélin eyðileggst út af einhverri útgáfu tapast ekkert nema það sem við áttum eftir að commita.

Strax er komin nokkuð öflugt kerfi fyrir sem gæti haldið utan um prófanir og deployment á einföldum forritum sem væru frekar til skemmtunar heldur en vara. 

# NodeJS - Serial/parallel

NodeJS keyrir á aðeins einum þræði en með asynchronous hætti. Þannig er það a.m.k. frá sjónarhorni kóðans sem forritarinn skrifar. Undir liggja þræðir og vinnslur sem sjá um að hafa samband við gagnagrunna og ýmsa keyrslu.

Þegar fyrirspurnir koma á vefþjónin eru þær keyrða ein í einu. En þegar fyrirspurn kemur inn um að t.d. leita í gagnagrunni er hún send í biðröð og aðal þráðurinn keyrir áfram eins og ekkert hafi í skorist, engin bið s.s. Gagnagrunns aðgerðin keyrir svo og skilar sér til baka er "callback" fallið sem með fylgdi ræst upp og sett í aðra biðröð sem svo keyrir þegar tími er kominn til.

Þetta er það sem kallað er Non-blocking I/O. Þó svo að I/O skipun (lesa úr skrá/gagnagrunn) sé keyrð, stöðvar hún ekki keyrslu og það þarf ekki að passa upp á þráðaákeyrslu eða neitt slíkt (concurrent vesen) frá sjónarhorni forritarans.

Þegar álagsprófunin er keyrð keyrir hún því serial frá okkar sjónarhorni þar sem aðeins ein fyrirspurn er tekin fyrir í einu. Þegar fyrirspurnirnar svo klárast er þeim svarað þegar að þeim kemur í biðröðinni.


# Day 11 viðbót

## What does this give us? Who would use the capability to track versions and why? Who would use capability to deploy any version and why?

Að hafa þann möguleika að geta keyrt upp hvaða útgáfu sem er gefur okkur mikið öryggi gagnvart óvæntum villum, svo lengi sem við erum með mjög ört deployment og erum því ekki að rúlla til baka mikilvægum hlutum sem brjóta aðra hluti fyrir viðskiptavinum. Ef við byggjum nýja útgáfu oft og komumst svo að því að það er villa í útgáfu X getum við því auðveldlega skipt yfir í útgáfum Y sem er þá eldri en X.

Þeir sem myndu nýta sér þetta væru þá þær sem sæju um Ops ferlið. Ef þeir sjá eða fá kvörtun um villu sem er nógu alvarleg til að rúlla þurfi útgáfu til baka í stað þess að taka sinn tíma að laga hana fyrst geta þeir a.m.k. haft virkandi útgáfu á meðan til að nota á meðan villan er löguð.

Þeir sem sjá um að prófa hugbúnaðinn hafa einnig mikið gagn af því að geta skipt á milli útgáfa. Hver var munurinn? Hvað hætti að virka? Hvernig breyttist þessi virkni? O.fl. spurningar sem gætu komið upp.

## What was wrong with having docker push in the deployment script rather than in the dockerbuild.sh script?

Dockerbuild.sh skriptan, eins og nafnið gefur til kynna, á að byggja docker image. Ef við höfum "push" partinn utan þess getum við ekki verið jafn viss á því að réttri útgáfu hafi verið ýtt áfram á docker þjóninn. Við höfum meiri yfirsýn og stjórn yfir þeim villum sem eiga sér stað inn í dockerbuild.sh og getum tekið ákvarðanir þaðan sem endurspegla betur hvað við viljum gera, push eða ekki o.s.frv. Við erum því ekki jafn viss á því hvort við séum örugglega með rétta útgáfu af docker myndinni ef við pushum utan þess.

## How does the "deploy any version, anywhere" build feature work? Hint: Track GIT_COMMIT

Git hashið af síðuta commiti er sett sem ID á docker image sem ýtt er áfram á docker þjóninn sem þýðir að við eigum ID sem endurspeglar hvaða Git commit hún á við. Þannig getum við einfaldlega kíkt á hvaða Git umhverfi sem við notum, flett upp á viðeigandi commiti, fundið hashið og náð í viðeigandi image eða deployað henni.
