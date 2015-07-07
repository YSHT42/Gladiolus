#pragma strict
var position= new Vector3[16];
var Opt:Transform;
function Start () 
{

}

function Update () 
{
	if(position[0]!=transform.position)
	{
		for(var i=15;i>0;i--)
		{
			position[i]=position[i-1];
		}
		position[0]=transform.position;
		Opt.position=position[15];
	}
}