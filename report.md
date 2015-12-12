# Tækni

## Vagrant

Hugbúnaður sem setur upp sýndarvélar. Notandinn setur inn þær stillingar sem hann vill og Vagrant sér um að setja allt upp m.v. hvernig Vagrantfile skráin er sett upp. Mjög þægilegt til þess bæði að sleppa við tíma í að setja upp vélina handvirkt og að fá sömu niðurstöðu í hvert sinn sem vél er sett upp.

## VirtualBox

VirtualBox er hugbúnaður sem býr til og sér um sýndarvélar.

## Grunt

Grunt er forrit sem sér um að keyra JavaScript verkefni út frá stillingaskrá. Þessi verkefni eru oftast þess eðlis að sjálfvirknivæða hluti eins og að þýða LESS og CASS, setja saman JavaScript skrár og "uglifia" þær sem dæmi. Oftast er Grunt nýtt í að sjálfvirknivæða þessa ferla.

## npm

NPM (Node Package Manager) er pakkakerfi fyrir Node.js. Kerfið sér um að halda utan um útgáfur og uppsetningu á pökkum (forritum) sem, oft, koma Node.js við og snúast þessir pakkr að vefþjónustu parti vefþróunar.

## nodejs

NodeJS er vefþróunarforrit sem byggir á V8 JavaScript vélinni frá Google. NodeJS keyrir vefþjónustur skrifaðar í JavaScript. NodeJS er opinn hugbúnaður sem keyrir á OS X, Linux, Windows, FreeBSD o.fl. og er hefur því fengið all miklar vinsældir.

## bower

Bower, eins og NPM, er pakkakerfi nema fyrir framendaforritun. Angular, jquery, bootstrap o.fl.

# NodeJS - Serial/parallel

NodeJS keyrir á aðeins einum þræði en með asynchronous hætti. Þannig er það a.m.k. frá sjónarhorni kóðans sem forritarinn skrifar. Undir liggja þræðir og vinnslur sem sjá um að hafa samband við gagnagrunna og ýmsa keyrslu.

Þegar fyrirspurnir koma á vefþjónin eru þær keyrða ein í einu. En þegar fyrirspurn kemur inn um að t.d. leita í gagnagrunni er hún send í biðröð og aðal þráðurinn keyrir áfram eins og ekkert hafi í skorist, engin bið s.s. Gagnagrunns aðgerðin keyrir svo og skilar sér til baka er "callback" fallið sem með fylgdi ræst upp og sett í aðra biðröð sem svo keyrir þegar tími er kominn til.

Þetta er það sem kallað er Non-blocking I/O. Þó svo að I/O skipun (lesa úr skrá/gagnagrunn) sé keyrð, stöðvar hún ekki keyrslu og það þarf ekki að passa upp á þráðaákeyrslu eða neitt slíkt (concurrent vesen) frá sjónarhorni forritarans.

Þegar álagsprófunin er keyrð keyrir hún því serial frá okkar sjónarhorni þar sem aðeins ein fyrirspurn er tekin fyrir í einu. Þegar fyrirspurnirnar svo klárast er þeim svarað þegar að þeim kemur í biðröðinni.