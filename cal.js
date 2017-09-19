class Display extends React.Component{
    render(){
        const {display}=this.props;
        return(
            <div className="display">
                {display}
            </div>
    )
    }
}
class Keyboard extends React.Component{
    render(){
        const {keys,fn,equal,ac,del}=this.props;
        const lis=keys.map((v,i)=>(
        <li key={i}
            onClick={()=>{
                if(v.type=='o'||v.type=='number'){
                    fn(v)
                }else if(v.type=='equal'){
                    equal()
                }else if(v.type=='ac'){
                    ac()
                }else if(v.type=='del'){
                    del()
                }
            }}>
            <div className="button button1">{v.name}</div>
        </li>
    ))
        return(
            <div className="keyboard">
                <ul>
                    {lis}
                </ul>
            </div>
        )
    }
}
class Audio extends React.Component{
    render(){
        return(
            <audio src="1.mp3"></audio>
        )
    }
}
class Page extends React.Component{
    constructor(){
        super();
        this.state={
            keys:[
                {name:'Ac',type:'ac'},
                {name:'Del',type:'del'},
                {name:'%',type:'o'},
                {name:'/',type:'o'},
                {name:'7',type:'number'},
                {name:'8',type:'number'},
                {name:'9',type:'number'},
                {name:'*',type:'o'},
                {name:'4',type:'number'},
                {name:'5',type:'number'},
                {name:'6',type:'number'},
                {name:'-',type:'o'},
                {name:'1',type:'number'},
                {name:'2',type:'number'},
                {name:'3',type:'number'},
                {name:'+',type:'o'},
                {name:'0',type:'number'},
                {name:'.',type:'number'},
                {name:'+/-',type:'o'},
                {name:'=',type:'equal'},

            ],
            expression:'',
            display:'0',
        }
        this.fn=this.fn.bind(this);
        this.equal=this.equal.bind(this);
        this.ac=this.ac.bind(this);
        this.del=this.del.bind(this);

    }
    audioPlay(){
        const audio=document.querySelector('audio');
        audio.play();
        let time=0;
        setTimeout(()=>{
            audio.pause()
            audio.currentTime=0;
        },300)
    }
    fn(v){
       this.audioPlay()
        let r=this.state.expression+v.name;
        this.setState({
            expression:r,
            display:r,
        })

    }
    equal(){
        this.audioPlay()
        var reg=/^[+-]?\d+(\.?\d{0,2})([%+*/-]?\d+(\.?\d{0,2}))+$/;
        if(reg.test(this.state.expression)){
            this.setState({
                expression:'',
                display:eval(this.state.display),
            })
        }else{

        }

    }
    ac(){
        this.audioPlay()
        this.setState({
            expression:'',
            display:'0',
        })
    }
    del(){
        this.audioPlay()
        const num=this.state.expression.slice(0,-1);
        this.setState({
            expression:num,
            display:num,
        })
    }
    render(){
        const {display,keys} = this.state;

        return(
            <div className="box">
            <Display display={display}/>
            <Keyboard keys={keys} fn={this.fn} equal={this.equal} ac={this.ac} del={this.del}/>
             <Audio/>
            </div>
    )
    }
}
ReactDOM.render(<Page/>,document.querySelector('#app'))
