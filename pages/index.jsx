import * as React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import { useDebounce } from 'use-debounce'
import { usePrepareContractWrite, useContractWrite, useContractRead, useAccount, useDisconnect, erc20ABI } from 'wagmi'
import yvWftmABI from './yvftmABI.json'
import cookieCapitalABI from './CookieCapitalABI.json'
import { BigNumber, ethers } from "ethers";


const Home   = () => {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount()
  const { disconnect } = useDisconnect()

  const [toStake, setToStake] = React.useState('0')
  const [debouncedToStake] = useDebounce(toStake, 500)
 
  const [toEat, setToEat] = React.useState('0')
  const [debouncedToEat] = useDebounce(toEat, 500)

  const cookieCapitalAddress = '0xcF0CD547E9d1a7C865F81CeB9F12e0D9fFA99C88'
  const yvFtmAddress = '0x0dec85e74a92c52b7f708c4b10207d9560cefaf0'

  const [stakedBalance, set_stakedBalance] = React.useState('0')
  const [cookiesBalance, set_cookiesBalance] = React.useState('0')
  const [lastStaked, set_lastStaked] = React.useState('0')
  const [cookiePower, set_cookiePower] = React.useState('0')
  const [yvWFTMBalance, set_yvWFTMBalance] = React.useState('0')
  const [approved, set_approved] = React.useState('0')

  const [toHarvest, setToHarvest] = React.useState(0)
  React.useEffect(() => {
    if (!isConnected) { return }
    if (!stakedBalance) { return }
    let animationFrame;
    const animate = (time) => {
      setToHarvest(Number(ethers.utils.formatUnits(stakedBalance)) * (1000 + Number(cookiePower?.toString())) * ((Date.now() - new Date(lastStaked*1000).getTime())/3600000))
      animationFrame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [stakedBalance])

  const { data: _cookiesBalance } = useContractRead({
    address: cookieCapitalAddress,
    abi: cookieCapitalABI,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  })
  const { data: _stakedBalance } = useContractRead({
    address: cookieCapitalAddress,
    abi: cookieCapitalABI,
    functionName: '_staked',
    args: [address],
    watch: true,
  })
  const { data: _lastStaked } = useContractRead({
    address: cookieCapitalAddress,
    abi: cookieCapitalABI,
    functionName: '_lastStaked',
    args: [address],
    watch: true,
  })
  const { data: _cookiePower } = useContractRead({
    address: cookieCapitalAddress,
    abi: cookieCapitalABI,
    functionName: '_cookiePower',
    args: [address],
    watch: true,
  })
  const { data: _yvWFTMBalance } = useContractRead({
    address: yvFtmAddress,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  })
  const { data: _approved } = useContractRead({
    address: yvFtmAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address, cookieCapitalAddress],
    watch: true,
  })
  const { config: configApproval } = usePrepareContractWrite({
    address: yvFtmAddress,
    abi: yvWftmABI,
    functionName: 'approve',
    args: [cookieCapitalAddress, "115792089237316195423570985008687907853269984665640564039457584007913129639935"]
  })
  const { write: writeApproval } = useContractWrite(configApproval)

  const { config: configStake } = usePrepareContractWrite({
    address: cookieCapitalAddress,
    abi: cookieCapitalABI,
    functionName: 'stake',
    args: [debouncedToStake && ethers.utils.parseEther(debouncedToStake)],
  })
  const { write: writeStake, data: dataStake } = useContractWrite(configStake)
  
  const { config: configUnstake } = usePrepareContractWrite({
    address: cookieCapitalAddress,
    abi: cookieCapitalABI,
    functionName: 'unstake',
    args: [],
  })
  const { write: writeUnstake } = useContractWrite(configUnstake)

  const { config: configHarvest } = usePrepareContractWrite({
    address: cookieCapitalAddress,
    abi: cookieCapitalABI,
    functionName: 'harvest',
    args: [],
  })
  const { write: writeHarvest } = useContractWrite(configHarvest)
  
  const { config: configEat } = usePrepareContractWrite({
    address: cookieCapitalAddress,
    abi: cookieCapitalABI,
    functionName: 'eat',
    args: [debouncedToEat && ethers.utils.parseEther(debouncedToEat)],
  })
  const { write: writeEat } = useContractWrite(configEat)

  const { config: configHarvestAndEat } = usePrepareContractWrite({
    address: cookieCapitalAddress,
    abi: cookieCapitalABI,
    functionName: 'harvestAndEat',
    args: [],
  })
  const { write: writeHarvestAndEat } = useContractWrite(configHarvestAndEat)

  React.useEffect(() => {
    set_stakedBalance(_stakedBalance)
    set_cookiesBalance(_cookiesBalance)
    set_lastStaked(_lastStaked)
    set_cookiePower(_cookiePower)
    set_yvWFTMBalance(_yvWFTMBalance)
    set_approved(_approved)
  }, [_stakedBalance, _cookiesBalance, _lastStaked, _cookiePower, _yvWFTMBalance, _approved])

  return (
    <div>
      <Head>
        <title>Cookie Capital</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
          />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="left">
          <img src="https://i.imgur.com/tKJxANd.png" />
          {!isConnected ? (
              <>
                <br />
                <br />
                <ConnectButton />
              </>
            ) : (
              <>
                {approved?.toString() === '0'
                  && (
                    <>
                      <br /><br /><br />
                      <button disabled={!writeApproval} onClick={() => { writeApproval?.() }}>
                        Approve yvWFTM Spending
                      </button>
                      <br />
                      <a style={{textAlign:'center'}}href="https://yearn.finance/vaults/250/0x0DEC85e74A92c52b7F708c4B10207D9560CEFaf0">What is yvWFTM?</a>
                    </>
                  )
                }
                {/* <span>FTM: {ftmBalance?.formatted}</span> */}
                {approved?.toString() !== '0'
                  && (
                    <>
                      <br />
                      <br />
                      <br />
                      <div className="balances">
                        <div className="l">
                          <span className='round'>yvWFTM:</span>
                          <span onClick={() => { setToStake(String(yvWFTMBalance && String(ethers.utils.formatUnits(yvWFTMBalance)))) }}>{yvWFTMBalance && Number(ethers.utils.formatUnits(yvWFTMBalance)).toFixed(10)}</span> 
                        </div>
                        <div className="r">
                          <span className='round'>yvWFTM Staked</span>
                          <span>{stakedBalance && Number(ethers.utils.formatUnits(stakedBalance)).toFixed(10)}</span>
                        </div>
                      </div>
                      <br />
                      <br />
                      <input type="number" placeholder="amount to stake" onChange={e => setToStake(e.target.value)} value={toStake}/>
                      <div>
                        {/* <button disabled={true} onClick={() => {}}>
                          Zap FTM
                        </button> */}
                        <button disabled={!writeStake} onClick={() => { writeStake?.() }}>
                          Stake yvWFTM
                        </button>
                      </div>
                    </>
                  )
                }
                <br />
                <br />
                <span style={{fontSize: 20}}><span className='round'>Cookie Power: </span>{1000 + Number(cookiePower?.toString())}</span>
                <br />
                <span className='round' style={{fontSize: 16}}>Baking {
                  (1000 + Number(cookiePower?.toString())) * Number(ethers.utils.formatUnits(stakedBalance)).toFixed(0)
                } cookies each hour</span>
                <br />
                <br />
                <span style={{fontSize: 28}}>
                  {/* Cookies (wallet):
                  <br/>
                  <i>
                    {cookiesBalance && ethers.utils.formatUnits(cookiesBalance)}
                  </i>
                  <br />
                  <br/> */}
                  <span className='round'>Cookies:</span>
                  <br/>
                  <span onClick={() => {
                    setToEat(String((((cookiesBalance || toHarvest) && Number(ethers.utils.formatUnits(cookiesBalance)) + (toHarvest || 0))*0.95).toFixed(0)))
                  }}>
                    {cookiesBalance && (toHarvest === 0 ? ethers.utils.formatUnits(cookiesBalance) : Number(ethers.utils.formatUnits(cookiesBalance)) + toHarvest)}
                  </span>
                </span>
                <br />
                <br />
                <input type="number" placeholder="amount to eat" onChange={e => setToEat(e.target.value)} value={toEat}/>
                <button disabled={!writeEat} onClick={() => { writeEat?.() }}>
                  Eat
                </button>
                <span className='round' style={{fontSize: 16, marginTop: 7, textAlign: 'center'}}>1000 cookies eaten = +1 cookie power</span>
                {/* <button style={{ position: 'absolute', top: 10, right: 10  }} onClick={() => { disconnect() }}>
                  Disconnect
                </button> */}
              </>
            )
          }
        </div>
        {isConnected &&
          <div className="right">
            <img src = "https://i.imgur.com/MnXxiWG.png"/>
            {toHarvest > 0 &&
            <>
              <br />
              <br />
              <span style={{fontSize: 28}}><span className='round'>Cookies to Harvest: </span><br/><span>{toHarvest}</span></span>
              <br />
              <br />
              <button disabled={!writeHarvest} onClick={() => { writeHarvest?.() }}>
                Harvest
              </button>
              <button disabled={!writeHarvestAndEat} onClick={() => { writeHarvestAndEat?.() }}>
                Harvest and Eat
              </button>
              <button disabled={!writeUnstake} onClick={() => { writeUnstake?.() }}>
                Harvest and Unstake
              </button>
            </>
            }
          </div>
        }
      </main>

      <footer>
        <a href="" target="_blank">
        </a>
      </footer>
    </div>
  );
};

export default Home;
