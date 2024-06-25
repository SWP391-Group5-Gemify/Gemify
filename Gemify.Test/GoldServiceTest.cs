using Core.Enitities;
using Core.Interfaces;
using Infrastructure.Services;
using Moq;

namespace Gemify.Test
{
    public class GoldServiceTest
    {
        [Test]
        public async Task UpdateGoldPrice_ShouldReturnTrue_WhenUpdateSuccess()
        {
            // Arrange
            var mockUnitOfWork = new Mock<IUnitOfWork>();
            var goldPrice = new GoldPrice(1, 5000000, 4000000);

            // Setup return value to be false (Complete() method returns 1
            // which mean 1 entry in the database is updated -> update succeeded)
            mockUnitOfWork.Setup(m => m.Repository<GoldType>().GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(new GoldType());

            mockUnitOfWork.Setup(m => m.Repository<GoldPrice>().Add(goldPrice));
            mockUnitOfWork.Setup(m => m.Repository<GoldType>().Update(new GoldType()));

            mockUnitOfWork.Setup(m => m.Complete())
                .ReturnsAsync(1);

            // Inject mocked unit of work into GoldService
            var goldService = new GoldService(mockUnitOfWork.Object);

            // Act
            var output = await goldService.UpdateGoldPriceAsync(goldPrice);

            // Assert
            Assert.True(output);
        }

        [Test]
        public async Task UpdateGoldPrice_ShouldReturnFalse_WhenUpdateFailed()
        {
            // Arrange
            var mockUnitOfWork = new Mock<IUnitOfWork>();
            var goldPrice = new GoldPrice(1, 5000000, 4000000);

            // Setup return value to be false (Complete() method returns 0
            // which mean 0 entry in the database is updated -> update failed)
            mockUnitOfWork.Setup(m => m.Repository<GoldType>().GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(new GoldType());

            mockUnitOfWork.Setup(m => m.Repository<GoldPrice>().Add(goldPrice));
            mockUnitOfWork.Setup(m => m.Repository<GoldType>().Update(new GoldType()));

            mockUnitOfWork.Setup(m => m.Complete())
                .ReturnsAsync(0);

            // Inject mocked unit of work into GoldService
            var goldService = new GoldService(mockUnitOfWork.Object);

            // Act
            var output = await goldService.UpdateGoldPriceAsync(goldPrice);

            // Assert
            Assert.False(output);
        }

        [Test]
        public async Task UpdateGoldPrice_ShouldReturnFalse_WhenGoldTypeIsNull()
        {
            // Arrange
            var mockUnitOfWork = new Mock<IUnitOfWork>();
            var goldPrice = new GoldPrice(1, 5000000, 4000000);

            // Setup return value to be false (GetByIdAsync(goldTypeId) returns null)
            mockUnitOfWork.Setup(m => m.Repository<GoldType>().GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync((GoldType) null);

            mockUnitOfWork.Setup(m => m.Repository<GoldPrice>().Add(goldPrice));
            mockUnitOfWork.Setup(m => m.Repository<GoldType>().Update(new GoldType()));

            mockUnitOfWork.Setup(m => m.Complete())
                .ReturnsAsync(0);

            // Inject mocked unit of work into GoldService
            var goldService = new GoldService(mockUnitOfWork.Object);

            // Act
            var output = await goldService.UpdateGoldPriceAsync(goldPrice);

            // Assert
            Assert.False(output);
        }
    }
}
