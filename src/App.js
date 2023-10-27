import { useState, useEffect } from 'react'

function App() {

	
	const hiragana = [
		{ romanji: 'a', hiragana: 'あ' },
		{ romanji: 'i', hiragana: 'い' },
		{ romanji: 'u', hiragana: 'う' },
		{ romanji: 'e', hiragana: 'え' },
		{ romanji: 'o', hiragana: 'お' },
		{ romanji: 'ka', hiragana: 'か' },
		{ romanji: 'ki', hiragana: 'き' },
		{ romanji: 'ku', hiragana: 'く' },
		{ romanji: 'ke', hiragana: 'け' },
		{ romanji: 'ko', hiragana: 'こ' },
		{ romanji: 'sa', hiragana: 'さ' },
		{ romanji: 'shi', hiragana: 'し' },
		{ romanji: 'su', hiragana: 'す' },
		{ romanji: 'se', hiragana: 'せ' },
		{ romanji: 'so', hiragana: 'そ' },
		{ romanji: 'ta', hiragana: 'た' },
		{ romanji: 'chi', hiragana: 'ち' },
		{ romanji: 'tsu', hiragana: 'つ' },
		{ romanji: 'te', hiragana: 'て' },
		{ romanji: 'to', hiragana: 'と' },
		{ romanji: 'na', hiragana: 'な' },
		{ romanji: 'ni', hiragana: 'に' },
		{ romanji: 'nu', hiragana: 'ぬ' },
		{ romanji: 'ne', hiragana: 'ね' },
		{ romanji: 'no', hiragana: 'の' },
		{ romanji: 'ha', hiragana: 'は' },
		{ romanji: 'hi', hiragana: 'ひ' },
		{ romanji: 'fu', hiragana: 'ふ' },
		{ romanji: 'he', hiragana: 'へ' },
		{ romanji: 'ho', hiragana: 'ほ' },
		{ romanji: 'ma', hiragana: 'ま' },
		{ romanji: 'mi', hiragana: 'み' },
		{ romanji: 'mu', hiragana: 'む' },
		{ romanji: 'me', hiragana: 'め' },
		{ romanji: 'mo', hiragana: 'も' },
		{ romanji: 'ya', hiragana: 'や' },
		{ romanji: 'yu', hiragana: 'ゆ' },
		{ romanji: 'yo', hiragana: 'よ' },
		{ romanji: 'ra', hiragana: 'ら' },
		{ romanji: 'ri', hiragana: 'り' },
		{ romanji: 'ru', hiragana: 'る' },
		{ romanji: 're', hiragana: 'れ' },
		{ romanji: 'ro', hiragana: 'ろ' },
		{ romanji: 'wa', hiragana: 'わ' },
		{ romanji: 'wo', hiragana: 'を' },
		{ romanji: 'n', hiragana: 'ん' }
	]

	// const hintCharacters = [
	// 	'え (e)', 'う (u)', 'お (o)', 'か (ka)', 'す (su)', 'ひ (hi)', 'ふ (fu)', 'ま (ma)', 'る (ru)', 'や (ya)',
	// 	// Add more hint characters as needed
	//   ];
	const hintCharacters = hiragana.map(({ hiragana, romanji }) => `${hiragana} (${romanji})`);


	const [input, setInput] = useState('')
	const [current, setCurrent] = useState(0)
	
	const [streak, setStreak] = useState(0)
	const [maxStreak, setMaxStreak] = useState(0)

	const [error, setError] = useState(false)
	const [showHint, setShowHint] = useState(false); // State to track whether to show hints or answers


	const setRandomHiragana = () => {
		const randomIndex = Math.floor(Math.random() * hiragana.length)
		setCurrent(randomIndex)
		setShowHint(false); 
	}

	const handleChange = (e) => {
		setInput(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		 
		if (input.toLowerCase() === hiragana[current].romanji) {
			if (!showHint) { // Only increase streak if no hint was shown
			setStreak(streak + 1)
			setMaxStreak(streak + 1 > maxStreak ? streak + 1 : maxStreak)
			setError(false)

			localStorage.setItem('streak', streak + 1)
			localStorage.setItem('maxStreak', streak + 1 > maxStreak ? streak + 1 : maxStreak)
		} 
		setError(false);
	}
		else {
			const h = hiragana[current].hiragana
			const r = hiragana[current].romanji
			setError(`Wrong! The correct answer for ${h} is ${r}`)
			setStreak(0)
			localStorage.setItem('streak', 0)
		}

		setInput('')
		setRandomHiragana()
	}
    const toggleHint = () => {
		setShowHint(!showHint);
		if (showHint) {
			// If the hint was previously shown, do not change the streak.
			return;
		  }
		   // If the hint is being shown for the first time, subtract 1 from the streak.
		setStreak(Math.max(0, streak - 1)); // Subtract 1 from the score when showing hint
		localStorage.setItem('streak', Math.max(0, streak - 1));
	  };


	useEffect(() => {
		setRandomHiragana()
		setStreak(parseInt(localStorage.getItem('streak')) || 0)
		setMaxStreak(parseInt(localStorage.getItem('maxStreak')) || 0)
	}, [])

	return (
		<div className="min-h-screen bg-slate-800 text-white text-center">
			<header className="p-6 mb-8">
				<h1 className="text-2xl font-bold uppercase">Hiragana Quiz</h1>
				<div>
					<p>{streak} / {maxStreak}</p>
				</div>
			</header>
            

			{/* <div className="text-9xl font-bold mb-8">
        <p>{showHint ? hintCharacters[current] : ''}</p>
      </div> */}

			<div className="text-9xl font-bold mb-8">
				<p>{hiragana[current].hiragana}</p>
			</div>

			<div className="mb-8">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						onChange={handleChange}
						value={input}
						className="block w-80 bg-transparent border-b-2 border-b-white mx-auto outline-none text-center text-4xl pb-2" />
				</form>
			</div>

		
			{error && 
				<div>
					<p>{ error }</p>
				</div>
			
			}
			{showHint && (
        <div className="mb-8">
          <p>Answer: {hiragana[current].romanji}</p>
        </div>
      )}

      <button onClick={toggleHint} className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded m-20">
        {showHint ? 'Hide Hint' : 'Show Hint (-1 point)'}
      </button>

      
    </div>
		
	)
}

export default App

