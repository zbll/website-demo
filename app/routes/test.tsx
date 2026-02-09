import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function TestScreen() {
  const urls = [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const imgsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const imgs = imgsRef.current;
    if (!imgs) return;
    const container = containerRef.current;
    if (!container) return;
    let height = 0;
    if (imgs.length > 0) {
      height = imgs[0].clientHeight;
    }
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: `top center-=${height / 2}`,
        end: `bottom+=${imgs.length * 4}00`,
        pin: true,
        scrub: true,
        markers: true,
      },
    });
    imgs.forEach((img, index) => {
      timeline
        .from(img, { rotateX: -45, transformOrigin: 'bottom center' })
        .to(img, { translateY: -(height * index), rotateX: 0 });
    });
    return () => {
      timeline.kill();
    };
  }, [containerRef, imgsRef]);

  return (
    <>
      Deserunt esse ullamco laborum Lorem excepteur veniam esse. Occaecat duis veniam minim commodo
      ullamco proident proident commodo. Exercitation anim consequat fugiat eiusmod quis amet.
      Officia pariatur sit dolor dolore enim ipsum irure do elit eu eu mollit commodo. Quis fugiat
      occaecat ad nulla irure irure occaecat consectetur incididunt nisi aute in in. Occaecat amet
      voluptate cupidatat adipisicing elit nostrud dolor et cupidatat consectetur dolor. Labore esse
      ex excepteur id exercitation elit ut magna nulla voluptate consectetur. Mollit quis ex aliquip
      reprehenderit occaecat consectetur culpa sint magna laborum proident excepteur in. Est elit
      amet ipsum sint voluptate Lorem excepteur non do. Nisi tempor anim incididunt velit qui ea
      elit velit ea quis. Irure irure do laborum nisi. Irure ut non est minim consequat commodo
      commodo labore quis velit sunt. Adipisicing cillum dolor occaecat mollit consequat elit
      tempor. Nostrud officia est sit commodo est ullamco Lorem non dolore sit elit nulla laborum.
      Voluptate excepteur et Lorem ad irure in ipsum sunt non esse dolore. Sunt occaecat est quis
      culpa nulla esse nisi non incididunt exercitation excepteur qui. Consectetur nisi nulla
      commodo irure velit occaecat sit laborum ipsum sint officia in consequat Lorem. Fugiat tempor
      excepteur laboris elit cillum ex enim velit non voluptate deserunt quis. Eu qui ad magna
      excepteur elit consequat fugiat enim. Velit mollit adipisicing consectetur fugiat ipsum ea
      esse. Consequat fugiat nostrud elit nulla cupidatat cillum cupidatat est fugiat in commodo.
      Dolor consectetur consectetur esse ea id officia et esse mollit mollit sit eiusmod quis
      aliquip. Eiusmod velit enim ipsum consequat ad cillum anim anim veniam velit incididunt
      occaecat enim minim. Fugiat cupidatat ad excepteur amet eu commodo in nulla laborum culpa
      nulla. Ad nostrud sint ut id sunt proident eu. In esse deserunt irure aute amet anim occaecat
      non ea excepteur est quis adipisicing. Id incididunt dolore magna ea laboris elit tempor nisi
      qui. Sint anim aute et officia adipisicing do nostrud fugiat quis aute adipisicing deserunt
      officia ipsum. Labore quis reprehenderit do occaecat nostrud elit ea magna laboris. Sunt
      eiusmod Lorem dolor anim mollit ea consectetur mollit incididunt id et nulla sint magna. Minim
      aliqua adipisicing qui nulla officia consequat. Dolor esse ad cupidatat ut magna. Consectetur
      dolore eu velit magna non. Esse culpa amet fugiat est. Laboris aliquip sunt Lorem ex.
      Adipisicing sint veniam sunt ut dolore eu veniam nostrud enim reprehenderit. Aliqua dolor
      exercitation laborum duis. Reprehenderit culpa reprehenderit qui eu nostrud amet culpa ex
      cupidatat elit esse veniam magna veniam. Est cillum ut elit non elit qui nisi ea Lorem laboris
      in commodo voluptate aliquip. Dolor elit ex voluptate amet dolor nulla deserunt non dolore
      voluptate. Proident nostrud quis fugiat pariatur in do excepteur laborum est fugiat duis.
      Veniam ut quis aliqua proident irure velit magna fugiat veniam ea enim Lorem Lorem. Elit id ut
      occaecat Lorem eiusmod adipisicing et sit velit laboris aliquip et. Sunt fugiat adipisicing
      cupidatat tempor nulla adipisicing ut. Ipsum deserunt aliquip ad eu occaecat aliquip est velit
      eu pariatur ad laborum esse exercitation. Excepteur est voluptate consectetur in sit
      incididunt. Fugiat commodo magna eiusmod duis in est dolor aliqua. Lorem consequat nisi
      reprehenderit et exercitation aliquip veniam quis ipsum ea ullamco pariatur. Minim cupidatat
      ad sunt adipisicing exercitation Lorem tempor ullamco proident. Fugiat consequat incididunt
      fugiat deserunt exercitation cupidatat. Laboris ad do ex ad ullamco duis enim labore voluptate
      nisi do sit. Laboris nulla qui cillum irure anim eu dolor. Eu do laborum dolore eiusmod veniam
      quis in. Id culpa officia commodo culpa ex eu exercitation exercitation voluptate irure minim
      consectetur. Dolore veniam aute irure ea duis ipsum commodo qui minim in cupidatat ipsum nisi
      in. Voluptate incididunt voluptate adipisicing minim aliquip sunt eu sint proident velit
      commodo aliquip magna ipsum. Deserunt fugiat ipsum incididunt labore. Laboris dolor aliquip
      Lorem id voluptate tempor consectetur laborum sint reprehenderit commodo adipisicing. Id et et
      id dolor nisi ad laborum magna et veniam. Culpa sunt proident tempor ipsum sunt. Non sint amet
      velit officia. Sint culpa tempor tempor amet laborum reprehenderit elit nostrud consectetur.
      Nostrud nostrud eiusmod veniam laboris enim esse minim irure in adipisicing sint. Ex amet
      consectetur officia excepteur anim aute incididunt eiusmod eu ex ad ipsum. Exercitation eu
      excepteur pariatur incididunt nisi dolor voluptate irure.
      <div className="flex w-full flex-col items-center perspective-distant" ref={containerRef}>
        {urls.map((url, index) => (
          <div
            ref={(node) => {
              if (node) {
                imgsRef.current.push(node);
              } else {
                imgsRef.current = imgsRef.current.filter((img) => img !== node);
              }
            }}
            key={index}
            style={{
              transform: `translateY(-${index}px)`,
            }}
            className="h-[300px] w-[500px] shrink-0 overflow-hidden rounded-[32px] border border-slate-700/60"
          >
            <img src={url} alt="123" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      Tempor proident incididunt magna dolor duis commodo tempor do ad. Eu veniam adipisicing ex
      nisi dolor ipsum magna adipisicing. Exercitation pariatur qui laborum irure voluptate anim
      ullamco occaecat deserunt aliquip in. Consequat qui non adipisicing nostrud nulla laborum
      ipsum officia sit commodo dolor. Anim consequat ea sunt anim sunt occaecat esse reprehenderit
      elit do. Fugiat ullamco duis enim anim in. Sunt laboris exercitation incididunt mollit elit
      laboris mollit sit. Qui aute minim nostrud consequat dolore do consequat. Aliqua ea aliquip
      aliquip pariatur laboris dolor enim Lorem laboris veniam enim cupidatat commodo fugiat. Ad
      commodo veniam est fugiat amet reprehenderit duis sit laboris. Cupidatat duis aliquip
      excepteur eiusmod consequat laborum enim dolor qui sunt incididunt. In enim anim ipsum duis
      fugiat Lorem aliquip aliquip laboris et sit. Anim sit fugiat nisi sint fugiat deserunt non ea
      minim ea enim minim ullamco ex. Labore eu tempor elit in laboris est eiusmod irure proident
      esse ad. Magna exercitation magna nisi magna reprehenderit cupidatat labore aute do aliquip
      cupidatat ut excepteur ad. Aliqua eu Lorem dolore nulla Lorem elit. Quis sit ex culpa mollit
      dolore dolore est. Elit sint consequat pariatur nisi anim. Adipisicing in nulla aliquip amet
      est sunt. Ea adipisicing veniam minim pariatur culpa aliquip dolore reprehenderit id officia.
      Ea eu consequat nulla ipsum ullamco et consectetur. Qui duis aliqua labore anim. Irure
      proident enim laborum velit ullamco do dolore ea commodo enim aute nostrud non magna. Veniam
      Lorem nulla occaecat consequat aute dolore non ad veniam sunt eiusmod occaecat enim labore.
      Esse adipisicing duis cillum ut fugiat culpa esse aliqua velit veniam. Esse non et irure nisi
      officia. In ut irure pariatur exercitation occaecat. Voluptate proident consequat ipsum ad ad
      nulla fugiat. Proident excepteur consectetur irure officia voluptate nisi veniam
      reprehenderit. Lorem eu ea dolor Lorem sint nisi velit non laborum sint. Non qui veniam
      cupidatat ad ut et ipsum est fugiat Lorem dolore aute occaecat. Sunt cupidatat nostrud quis ad
      Lorem esse irure non culpa ex adipisicing. Dolore elit pariatur nisi incididunt labore.
      Adipisicing laborum qui ipsum exercitation aliqua quis quis excepteur elit mollit ipsum. Culpa
      veniam fugiat fugiat eu deserunt incididunt excepteur non laborum irure officia quis.
      Exercitation aute pariatur ullamco minim esse tempor id fugiat ea ut deserunt. Magna ea
      cupidatat cupidatat ex dolore ut. Enim ea culpa non adipisicing id magna aliqua exercitation
      officia. In aliquip ex in ex exercitation mollit esse ipsum laborum. Proident nulla laborum
      sit mollit fugiat sint irure aute excepteur voluptate enim cillum occaecat. Laboris labore
      labore voluptate excepteur consectetur duis consequat ex reprehenderit mollit exercitation.
      Velit eu aliqua duis excepteur anim culpa. Deserunt sunt ex deserunt esse voluptate officia
      nostrud velit adipisicing nostrud ex fugiat duis excepteur. Ut cupidatat magna reprehenderit
      quis est deserunt nostrud consequat dolor exercitation id sunt consequat. Eiusmod pariatur
      adipisicing veniam et duis sint duis. Duis id cupidatat ullamco ex quis tempor. Labore aute
      enim veniam dolor pariatur elit aliqua adipisicing est ex velit. Dolor id ipsum ad ex proident
      cupidatat. Minim non veniam exercitation ut non do excepteur reprehenderit ut pariatur
      incididunt. Ad incididunt pariatur nostrud enim consequat aute incididunt labore ea. Ut magna
      ea id incididunt excepteur. Magna deserunt voluptate tempor id excepteur veniam dolor.
      Cupidatat labore sint esse qui nisi laboris culpa reprehenderit non consectetur voluptate
      excepteur cupidatat. Reprehenderit mollit non ex cillum velit labore ipsum Lorem laboris
      cillum. Sit reprehenderit laborum consequat amet et amet consectetur reprehenderit mollit
      consectetur pariatur laborum anim eiusmod. Exercitation magna cillum consequat ex ipsum.
      Consequat enim Lorem cillum eiusmod. Non ullamco incididunt nulla quis pariatur commodo non
      amet cillum reprehenderit laboris non. Sunt commodo cupidatat labore dolor qui dolore labore
      ex aliqua fugiat. Magna magna consequat laboris minim culpa. Do laborum pariatur labore
      consectetur. Lorem labore magna ipsum dolor ut est ipsum sit nisi nostrud est ipsum anim.
      Dolor labore consequat laborum pariatur. Dolore tempor laborum laboris est aute sit pariatur.
      Non cillum eu in esse aliqua. Ullamco consectetur fugiat commodo esse laborum esse et ut aute
      enim. Ipsum nisi cillum esse ea labore excepteur quis est ullamco. Nostrud eu qui elit est
      anim officia consequat tempor officia nisi in qui pariatur ipsum. Sint in ad adipisicing ipsum
      eiusmod minim cupidatat aliqua. Lorem reprehenderit ullamco consectetur id et esse minim
      officia culpa tempor nostrud deserunt anim do. Adipisicing fugiat duis deserunt est aute ipsum
      pariatur magna Lorem mollit ullamco exercitation adipisicing id. Adipisicing magna deserunt
      labore anim proident incididunt aliquip tempor. Consequat qui est labore officia sit occaecat
      nulla sint enim ad ut reprehenderit veniam magna. Cupidatat commodo commodo laborum excepteur
      incididunt. Tempor est tempor irure eu reprehenderit. Qui do ipsum irure occaecat commodo
      occaecat est duis elit culpa eiusmod ullamco irure laborum. Minim fugiat et duis elit. Eiusmod
      enim ipsum cupidatat velit ex est eu velit officia. Aliqua mollit cillum dolor voluptate
      nostrud nostrud. Culpa laborum enim commodo laborum excepteur. Et enim incididunt dolor dolor
      ullamco laborum cillum. Aliqua ut incididunt ut reprehenderit eiusmod nulla qui. Velit
      voluptate occaecat voluptate non commodo. Eiusmod in minim duis nostrud labore irure. Ea
      cupidatat nulla occaecat ullamco excepteur duis non. Velit deserunt consectetur qui enim esse
      occaecat ut cillum irure do esse do dolor. Tempor cupidatat id do est nisi. Aliquip aute velit
      aute magna laborum aute ut elit ad magna. Nisi ex duis pariatur in tempor fugiat voluptate ex
      magna. Ut aute nulla laboris dolore. Nulla duis exercitation nulla pariatur mollit cupidatat
      est nisi amet laboris dolor occaecat sit. Velit nulla velit consequat aliquip laboris esse
      irure eu.
    </>
  );
}
