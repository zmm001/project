�}+� r _!  ���D��~Q��a	��&��_���ꬩ>t8���*�(��G����-�U���>O�@�"*X��*د��Xe 2��$�.���%Aor�.��y��r�C�Ϗ����b[M���۷Z�/�:�c���%�3C.x�}�h+2���iLc� �$��+��I��K/�^n��q����i7x��,IS����b��8��/Z�y�:��;T~Bų������p^���1µÝ H��~ӸK���%S���֯�R�_N(Ꚁ������/����ࢳX� �6�w�`z�ԋ�X�b�U�c=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l,��\{s�[�'Fs��F��v#��H&�/��(�r�Gah �ɺ���8+V�$��h�.��@�<d	�0[�.U���ʳt�{�(�0Z�A/a�Y��?�����*�lN������ �n�ѣ���A��ύ�7������xL�wg�Jɢ�AX�on��@3m@�).K�?">�q	�h������KK�{W��~�y��+����Z:.�u!��B_D��/���x���wi�p���#�v�T,���(���������� �T�*ƈ�ѳ{�� R�ۃ&y��$t���h�"��ݖ��f�^k��xqj��D���P��a)9aڎy�& ����Bx֗��_����;ؠ7�&#be�ˌ)C���P^95�~�52�o]"$�Xx��HY+�w�ٳ��Zh��P:�����#�0G����I;~<�g���|5?����^����������V���Ԙ>]��Yek�1à;�2�'�GϼO���2���X�d ViewBag.SubType = allType.FindAll(x => x.IT_ParentID == 0);
            ViewBag.ZxDomain = Common.GetConfigString("domain_zixun");
            var zxAllType = DataHelper.GetZxAllInfoType(DataEnum.PcCache.ReflectCache, DataEnum.PcCache.AllZxTypeCache);
            ViewBag.FooterHtml = DataHelper.HttpPost("http://www.edushi.com/footer.html", string.Empty);
            return PartialView(zxAllType);
        }

    }
}
