�}M� r F!  ����*��a	��	�#����}��eZ׵���p����QY�I��ԪL/3�����57O�����2j�mբ�z�w�Im���#/�% �"rЬ,sg��.KW���a�	s�Ť%g�.U�`��#�fCn��%�ߌ�PT
���q��l���bd��H�螛I#}A�$�Q�s{�8��Y�.�k�̧�(����LX���1Ć<g��uV��۫���|!���4����^P���MS�Ȋ6�����z���y=Q�Zꑾ-� �Ujfad��� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�1����e#�)%�S�L���X��B$1�ʊ�~�J�vtb��|Wcj����D���S�ħH$�xHf���8Gs�G�l��b����u�Vtb0@`��Z���9C�≤(�J��V |���I���&��Z���М< �՝�N�95@G��[�e�<�FLi���e���jz�!����5qn�����:�Ҍ)B�ֶ��4�6%��L,�$����`S�RXY���y��yM����,��	�S���A�5�fm�:�$X�0>UBI���mUO���&�o���No(Tw^��������ڏ��(�����U��/	��
���`��lX�U���8"�� ~�9��Z9�:���k��Ɂ�=3���>��R�8>��|N���BK��T�@���5��ك8�\�]��Q�%,��D�1_��-̹�Ϝ����L�D�5fE'���#|{�׍@�Q��%[��/��sURfoG�?Ƣ��JB       model.TopRenWu = DataHelper.GetTopRenWu(0, 0, 6, Url.Content("~/"), reflectionCache, DataEnum.MobileCache.TopRwCache);

            //所有分类人物推荐列表
            model.channelRwList = DataHelper.GetChannelRwModelList(model.AllRwType, 8, (int)DataEnum.RecommendStatus.ChannelRecommend, Url.Content("~/"), DataEnum.MobileCache.IndexChannelRecCache, reflectionCache);

            ViewBag.ZxDomain = zixunDomain;

            return View(model);
        }

    }
}
