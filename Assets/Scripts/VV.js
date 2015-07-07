#pragma strict
var Speed:float;
var Sprs:Sprite[];
var Shooter:GameObject;
var Options:Transform[];
private var sprite:SpriteRenderer;
private var CD:int;

function Start () 
{
	sprite=GetComponent.<SpriteRenderer>();
}

function Update () 
{
	var Sprnum:int=0;
	if(Input.GetKey(KeyCode.UpArrow))		
	{
		move(Vector3( 0, 1, 0));
		Sprnum=2;
	}
	if(Input.GetKey(KeyCode.DownArrow))		
	{
		move(Vector3( 0,-1, 0));
		Sprnum=1;
	}
	if(Input.GetKey(KeyCode.RightArrow))	move(Vector3( 1, 0, 0));
	if(Input.GetKey(KeyCode.LeftArrow))		move(Vector3(-1, 0, 0));

	sprite.sprite=Sprs[Sprnum];

	if(Input.GetKeyDown(KeyCode.Z))
	{
		fire(-90,8,Shooter.transform);
		fire(-90,8,Options[0]);
		fire(-90,8,Options[1]);
		fire(-90,8,Options[2]);
		fire(-90,8,Options[3]);

	}
	if(CD==2)
	{
		fire(-90,8,Shooter.transform);
		fire(-90,8,Options[0]);
		fire(-90,8,Options[1]);
		fire(-90,8,Options[2]);
		fire(-90,8,Options[3]);
		CD=0;
	}
	if(Input.GetKey(KeyCode.Z))	CD++;
	else 						CD=0;
}



function move(dir:Vector3)
{
	var pos=transform.position;
	if(pos.x<=200 && pos.x>=-200 && pos.y<=90 && pos.y>=-90)
	{
		pos += Speed*dir*2;
	}
	if (pos.x>200)
	{
		pos.x=200;
	}
	if (pos.x<-200)
	{
		pos.x=-200;
	}
	if (pos.y>90)
	{
		pos.y=90;
	}
	if (pos.y<-90)
	{
		pos.y=-90;
	}
	transform.position=pos;

}

function fire(angle:float,V:float,Hunger:Transform)
{
	var rot:Quaternion;
	rot.eulerAngles=Vector3(0,0,angle);
	
	var shotobj = Instantiate(Resources.Load("Objects/Shot", GameObject), Hunger.position,rot);
	shotobj.transform.SetParent(Hunger);
	shotobj.gameObject.GetComponent(ShotSytem).V = V;
	shotobj.gameObject.GetComponent(ShotSytem).Type=0;
}