�}J� r s  �L��mb���a	��� �#_��v|��$$��\�t��X�5P-69��`G��znH�oz�:}Ӿ.]�ͺ�w�b3ń:�%l(,K4�l <0�B���`��4z�Fv��m =`��H��ED��j"���ZVJr��7E7��v���B�;u�@�z鶁.OCn������ȂM��yV�$4'���4gm�6�Fm^X��=�s���p-�VVp� �|���A����&�V�� o�
��	��u��Z��B���~CY�i�b#� K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�ataHelper.GetUserId();
            var userModel = DataHelper.GetUserInfoByUIID(userId);
            if (userModel == null)
            {
                return Redirect(Url.Content("~/login.html"));
            }
            model.UserInfo = userModel;
            return View(model);
        }

    }
}
