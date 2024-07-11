import React, { FC } from 'react'
import cpu from '../../../../assets/icons/cpu.svg'
import disk from '../../../../assets/icons/disk.svg'
import ram from '../../../../assets/icons/ram.svg'

interface Config {
  label: string
  cpu: number
  disk: number
  ram: number
  img: string
}

interface ConfigurationCardProps {
  config: Config
  index: number
  selectedCardIndex: number | null
  handleCardClick: (index: number) => void
}

const ConfigurationCard: FC<ConfigurationCardProps> = ({
  config,
  index,
  selectedCardIndex,
  handleCardClick,
}) => (
  <div
    className={`configuration-cards-container ${selectedCardIndex === index ? 'selected' : ''}`}
    onClick={() => handleCardClick(index)}
  >
    <img src={config.img} alt="" className="configuration-image" />
    <div className="configuration-cards-details">
      <div className="configuration-details">
        <img src={cpu} alt="" />
        <p className="configuration-title">CPU</p>
      </div>
      <p className="configuration-number">{config.cpu} CPU</p>
    </div>
    <div className="configuration-cards-details">
      <div className="configuration-details">
        <img src={disk} alt="" />
        <p className="configuration-title">Disk Size</p>
      </div>
      <p className="configuration-number">{config.disk} GB</p>
    </div>
    <div className="configuration-cards-details">
      <div className="configuration-details">
        <img src={ram} alt="" />
        <p className="configuration-title">Ram Size</p>
      </div>
      <p className="configuration-number">{config.ram} GB</p>
    </div>
  </div>
)

export default ConfigurationCard
