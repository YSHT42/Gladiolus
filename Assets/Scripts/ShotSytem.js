#pragma strict

var Type:int;
var Fragile:boolean;
var V:float;
var Damage:int=1;
var Pshot:boolean;
var spr:Sprite [];
private var sprnum:int=0;
private var PL:GameObject;
private var Slow:float;
private var lang:float;
private var lang2:float;
function Start () 
{
	if(Type==1)V*=5;
	Slow=V*0.2;
	sprnum=Type;
	if(Fragile)
	{
		sprnum+=3;
	}
	if(Pshot)sprnum+=6;
	//GetComponent(SpriteRenderer).sprite=spr[sprnum];

	PL=gameObject.Find("PL");
	lang2=transform.eulerAngles.z;
	//lang=Flags.LookAt2D4S(transform.position,PL.transform.position);
}
function Update () 
{

	PL=gameObject.Find("PL");

	if(Pshot)	gameObject.tag="ps";
	else		gameObject.tag="es";
	
	var angle = transform.eulerAngles.z * Mathf.Deg2Rad;
	
	switch(Type)
	{
		case 0:////////////////////////////////////////////////////まっすぐ
			transform.localPosition.y += V*Mathf.Cos(angle);
			transform.localPosition.x -= V*Mathf.Sin(angle);
			break;
		case 1:////////////////////////////////////////////////////減速
			V+=(Slow-V)*0.1;
			transform.localPosition.y += V*Mathf.Cos(angle);
			transform.localPosition.x -= V*Mathf.Sin(angle);
			break;
		case 2:////////////////////////////////////////////////////追尾
			if(Vector2.Distance(transform.position,PL.transform.position)>50)
			{
				lang2 +=(lang-lang2)*0.2;
				transform.eulerAngles.z=lang2;
			}
			transform.localPosition.y += V*2*Mathf.Cos(angle);
			transform.localPosition.x -= V*2*Mathf.Sin(angle);
			break;

	}
	var pos = transform.position;
	if(pos.x>120||pos.x<-120 || pos.y>180||pos.y<-180)
	{
		Destroy(this.gameObject);
	}
}

function OnTriggerEnter2D(obj: Collider2D)
{

	if(obj.gameObject.tag=="p" && !Pshot)
	{
		//CamEffect.shake=10;
		//obj.GetComponent(pl).HP -= Damage;
		//obj.GetComponent(SpriteRenderer).color=Color(0.5,0.5,1,1);
		Destroy(this.gameObject);
	}
	if(obj.gameObject.tag=="e" && Pshot)
	{
		//obj.GetComponent(En).HP -= Damage;
		//obj.GetComponent(SpriteRenderer).color=Color(0.5,0.5,1,1);
		Destroy(this.gameObject);
	}
	if(obj.gameObject.tag=="Boss" && Pshot)
	{
		//obj.GetComponent(Boss).HP -= Damage;
		//obj.GetComponent(SpriteRenderer).color=Color(0.5,0.5,1,1);
		Destroy(this.gameObject);
	}

	if(obj.gameObject.tag=="ps" && !Pshot &&Fragile)
	{
		//CamEffect.shake=10;
		//obj.GetComponent(pl).HP -= Damage;
		//obj.GetComponent(SpriteRenderer).color=Color(0.5,0.5,1,1);
		Destroy(obj.gameObject);
		Destroy(this.gameObject);
	}
}
